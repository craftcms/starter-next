<?php
namespace modules\authorinfo;

use Craft;
use craft\elements\User;
use craft\events\DefineGqlTypeFieldsEvent;
use craft\gql\TypeManager;
use GraphQL\Type\Definition\Type;
use yii\base\Event;

class Module extends \yii\base\Module
{
    public static $instance;

    /**
     * Cache for the admin user to avoid multiple queries
     */
    private ?User $adminUser = null;

    public function init()
    {
        parent::init();
        self::$instance = $this;
        
        Event::on(
            TypeManager::class,
            TypeManager::EVENT_DEFINE_GQL_TYPE_FIELDS,
            [$this, 'handleDefineGqlTypeFields']
        );
    }

    /**
     * Get the admin user, caching the result
     */
    private function getAdminUser(): ?User
    {
        if ($this->adminUser === null) {
            $this->adminUser = User::find()
                ->admin(true)
                ->status(null)
                ->orderBy(['elements.id' => SORT_ASC])
                ->one();

            if ($this->adminUser) {
                Craft::info(
                    "Found admin user: ID: {$this->adminUser->id}, Name: {$this->adminUser->fullName}",
                    __METHOD__
                );
            } else {
                Craft::warning('No admin user found', __METHOD__);
            }
        }

        return $this->adminUser;
    }

    /**
     * Handle the DefineGqlTypeFields event
     */
    public function handleDefineGqlTypeFields(DefineGqlTypeFieldsEvent $event): void
    {
        if ($event->typeName !== 'EntryInterface') {
            return;
        }

        $event->fields['authorId'] = [
            'name' => 'authorId',
            'type' => Type::int(),
            'description' => 'The entry author\'s ID',
            'resolve' => function($source) {
                try {
                    if ($source->getSection()->type === 'single') {
                        return $this->getAdminUser()?->id;
                    }
                    return $source->authorId;
                } catch (\Throwable $e) {
                    Craft::error("Error resolving authorId: {$e->getMessage()}", __METHOD__);
                    return null;
                }
            }
        ];

        $event->fields['authorName'] = [
            'name' => 'authorName',
            'type' => Type::string(),
            'description' => 'The entry author\'s name',
            'resolve' => function($source) {
                try {
                    if ($source->getSection()->type === 'single') {
                        return $this->getAdminUser()?->fullName;
                    }
                    return $source->getAuthor()?->fullName;
                } catch (\Throwable $e) {
                    Craft::error("Error resolving authorName: {$e->getMessage()}", __METHOD__);
                    return null;
                }
            }
        ];
    }
}
