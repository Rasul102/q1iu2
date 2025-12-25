/**
 * Color Palette Documentation Component
 * This component displays the strict color palette used throughout the app
 * Only for development/design reference - not shown in production
 */

export function ColorPalette() {
  const colors = [
    { name: 'Background / Light Surface', hex: '#F2EFE7', usage: 'Main backgrounds, light surfaces' },
    { name: 'Secondary / Subtle Accent', hex: '#9ACBD0', usage: 'Secondary surfaces, borders, inactive states' },
    { name: 'Primary Action / Highlight', hex: '#48A6A7', usage: 'Primary buttons, active states, eye-glow effect' },
    { name: 'Text / Important UI', hex: '#006A71', usage: 'Text, important elements, emphasis' },
  ];

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-[#006A71] mb-4">Strict Color Palette</h3>
      {colors.map((color) => (
        <div key={color.hex} className="flex gap-3 items-center">
          <div
            className="w-16 h-16 rounded-lg border-2 border-[#006A71] flex-shrink-0"
            style={{ backgroundColor: color.hex }}
          />
          <div>
            <div className="text-[#006A71]">{color.name}</div>
            <div className="text-sm text-[#006A71]/70">{color.hex}</div>
            <div className="text-xs text-[#006A71]/50 mt-1">{color.usage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
