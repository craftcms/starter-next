export default function Footer({ address }) {
  if (!address) return null

  return (
    <footer className="bg-slate-50 py-6 px-2 text-sm">
      <div className="container mx-auto">
        <address className="not-italic">
          {address.title && <p className="font-bold">{address.title}</p>}
          <p>
            {address.addressLine1 && (
              <>
                {address.addressLine1}<br />
              </>
            )}
            {address.addressLine2 && (
              <>
                {address.addressLine2}<br />
              </>
            )}
            {address.addressLine3 && (
              <>
                {address.addressLine3}<br />
              </>
            )}
            {address.locality && address.postalCode && (
              <>
                {address.locality} {address.postalCode}<br />
              </>
            )}
            {address.countryCode}
          </p>
        </address>
      </div>
    </footer>
  )
}