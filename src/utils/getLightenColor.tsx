export default function getContrastColor(color: string, amount = 20) {
    // This is a simple version for the sake of simplicity
    // You may want a more sophisticated function to deal with different color formats (HEX, RGB, etc.)
    let usePound = false;
  
    if (color[0] === "#") {
      color = color.slice(1);
      usePound = true;
    }
  
    const num = parseInt(color,16);
    let r = (num >> 16) + amount;
    let b = ((num >> 8) & 0x00FF) + amount;
    let g = (num & 0x0000FF) + amount;
  
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
  
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }