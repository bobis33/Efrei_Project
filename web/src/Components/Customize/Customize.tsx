import { useState } from 'react';

const skins = [
  { id: 1, color: 'bg-red-500', texturePath: 'skins/BasketballColor.jpg' },
  { id: 2, color: 'bg-blue-500', texturePath: 'skins/NewTennisBallColor.jpg' },
  { id: 3, color: 'bg-green-500', texturePath: 'skins/SoftballColor.jpg' },
];

export default function Customize({ onBack, onTextureChange }: { onBack: () => void; onTextureChange: (texturePath: string) => void }) {
  const [selectedSkin, setSelectedSkin] = useState<number | null>(null);

  const handleSkinSelect = (skinId: number, texturePath: string) => {
    setSelectedSkin(skinId);
    onTextureChange(texturePath);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Choose your skin
        </h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
          {skins.map((skin) => (
            <button
              key={skin.id}
              className={`aspect-square rounded-lg border-2 border-gray-300 p-2 focus:outline-none transition-all duration-200 ${
                selectedSkin === skin.id ? 'border-blue-500' : 'hover:border-blue-300'
              }`}
              onClick={() => handleSkinSelect(skin.id, skin.texturePath)}
              aria-label={`Select skin color ${skin.id}`}
            >
              <div className="relative w-full h-full">
                <div
                  className={`absolute inset-0 rounded-full ${skin.color} transform transition-transform duration-200 ${
                    selectedSkin === skin.id ? 'scale-90' : 'scale-75'
                  }`}
                  aria-hidden="true"
                ></div>
              </div>
              <p className="text-center mt-2">Skin {skin.id}</p>
            </button>
          ))}
        </div>
        <button
          className="w-64 py-5 mt-10 text-xl font-semibold rounded-full bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}
