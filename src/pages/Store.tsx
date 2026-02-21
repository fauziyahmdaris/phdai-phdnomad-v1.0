import React from 'react';

const Store: React.FC = () => {
  const buyLink = 'https://buymeacoffee.com/qasharis';
  const imgSrc = '/store/drphdai-tshirt.png'; // place image at public/store/drphdai-tshirt.png
  const waNumber = '60193438388';
  const [size, setSize] = React.useState('M');
  const [qty, setQty] = React.useState(1);
  const [showGuide, setShowGuide] = React.useState(false);
  const waText = encodeURIComponent(
    `RE: Pre-Order DrPhDAI T.Shirt\nOrder details: Size ${size} x${qty}\nShipping: [Address]\nPayment: [Bank Transfer/E-wallet]`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="p-6 text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">DrPhDAI Store</h1>
        <p className="mt-2 text-sm text-white/90">Support our mission while showing off your research pride</p>
        <div className="mt-4 p-3 rounded-xl bg-white/10 ring-1 ring-white/20">
          <div className="text-sm font-semibold">Exclusive Merchandise</div>
          <p className="text-xs text-white/90 mt-1">Browse our collection of high-quality merchandise designed specifically for researchers and PhD students. Every purchase helps support the continued development of DrPhDAI and our mission to empower researchers worldwide.</p>
        </div>
      </div>

      {/* How to Order */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">How to Order</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Currently, we're processing all orders through WhatsApp for a personalized shopping experience. Click the button below to start a conversation with our store manager and place your order.</p>
          <ol className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>1) Click the "Shop via WhatsApp" button below to start a conversation</li>
            <li>2) Let us know which items you're interested in purchasing</li>
            <li>3) Provide your shipping details and preferred payment method</li>
            <li>4) Complete your payment and wait for your awesome DrPhDAI merchandise to arrive!</li>
          </ol>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-4 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">Shop via WhatsApp</a>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Store Details</h3>
          <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li><strong>Contact:</strong> WhatsApp (number shown after clicking)</li>
            <li><strong>Shipping:</strong> Available throughout Malaysia (Ships within Malaysia)</li>
            <li><strong>Processing Time:</strong> 3–5 business days</li>
            <li><strong>Payment Methods:</strong> Bank Transfer, E-wallet</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col p-5 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="relative w-full overflow-hidden bg-gray-50 rounded-xl aspect-[4/3] dark:bg-gray-700">
            <img
              src={imgSrc}
              alt="DrPhDAI Roundneck T‑Shirt (Black)"
              className="object-contain w-full h-full"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/640x480?text=DrPhDAI+T-Shirt';
              }}
            />
          </div>
          <div className="mt-4 flex-1">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Roundneck T‑Shirt (Black)</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Premium cotton tee with DrPhDAI logo. Soft, breathable, and perfect for conferences, viva, or casual days.</p>
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside dark:text-gray-300">
              <li>Unisex cutting, S–XXL</li>
              <li>High-quality print</li>
              <li>Color: Black</li>
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span>Size</span>
                  <button type="button" onClick={()=>setShowGuide(true)} className="text-blue-600 hover:text-blue-700 underline">Sizes Guide</button>
                </label>
                <select value={size} onChange={e=>setSize(e.target.value)} className="w-full px-2 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                  {['S','M','L','XL','XXL'].map(s=> (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                <input type="number" min={1} max={10} value={qty} onChange={e=>setQty(Math.max(1, Math.min(10, Number(e.target.value)||1)))} className="w-full px-2 py-2 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">RM69</div>
              <div className="text-xs text-gray-500">Approx. USD15</div>
            </div>
            <div className="flex gap-2">
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-700"
              >
                Buy Now
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Sizes Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-lg w-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">T‑Shirt Sizes Guide (Unisex)</h3>
              <button onClick={()=>setShowGuide(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
            </div>
            <div className="p-4 text-sm text-gray-700 dark:text-gray-300 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                  <div className="font-medium">S</div>
                  <div>Chest: 36–38" (91–96 cm)</div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                  <div className="font-medium">M</div>
                  <div>Chest: 38–40" (96–101 cm)</div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                  <div className="font-medium">L</div>
                  <div>Chest: 40–42" (101–106 cm)</div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                  <div className="font-medium">XL</div>
                  <div>Chest: 42–44" (106–112 cm)</div>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 col-span-2">
                  <div className="font-medium">XXL</div>
                  <div>Chest: 44–46" (112–117 cm)</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">Tips</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>If you are between sizes, choose one size up for a relaxed fit.</li>
                  <li>Unisex cutting; refer to chest width for best fit.</li>
                  <li>Care: wash inside out, cold water, do not bleach, tumble dry low.</li>
                </ul>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button onClick={()=>setShowGuide(false)} className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
