export default function Footer({ address }) {
  if (!address) return null

  return (
    <footer className="bg-slate-50 py-6 px-2 text-sm">
      <div className="container mx-auto">
        <address className="not-italic">
          {address.title && <p className="font-bold">{address.title}</p>}
          {address.addressLine1 && <p>{address.addressLine1}</p>}
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          {address.addressLine3 && <p>{address.addressLine3}</p>}
          {address.locality && address.postalCode && (
            <p>{address.locality} {address.postalCode}</p>
          )}
          {address.countryCode && <p>{address.countryCode}</p>}
        </address>
      </div>
    </footer>
  )
}