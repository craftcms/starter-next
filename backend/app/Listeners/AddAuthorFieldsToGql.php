<?php

namespace App\Listeners;

use CraftCms\Cms\Entry\Elements\Entry;
use CraftCms\Cms\Gql\Events\GqlTypeFieldsResolving;
use CraftCms\Cms\Section\Enums\SectionType;
use CraftCms\Cms\User\Elements\User;
use GraphQL\Type\Definition\Type;

/**
 * Adds `authorId` and `authorName` to entries in the GraphQL API. Singles have
 * no author, so they report the first admin instead.
 */
class AddAuthorFieldsToGql
{
    private ?User $admin = null;

    public function handle(GqlTypeFieldsResolving $event): void
    {
        if ($event->typeName !== 'EntryInterface') {
            return;
        }

        $event->fields['authorId'] = [
            'name' => 'authorId',
            'type' => Type::int(),
            'description' => 'The entry author’s ID',
            'resolve' => fn (Entry $entry) => $this->author($entry)?->id,
        ];

        $event->fields['authorName'] = [
            'name' => 'authorName',
            'type' => Type::string(),
            'description' => 'The entry author’s name',
            'resolve' => fn (Entry $entry) => $this->author($entry)?->fullName,
        ];
    }

    private function author(Entry $entry): ?User
    {
        if ($entry->getSection()?->type === SectionType::Single) {
            return $this->admin ??= User::find()->admin()->status(null)->orderBy('elements.id')->one();
        }

        return $entry->getAuthor();
    }
}
