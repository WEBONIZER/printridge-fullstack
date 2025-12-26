// Функции для определения типа прайса на основе характеристик устройств

import { PrinterPriceTemplateModel } from "../models/printer-price-template-model";
import { LaptopPriceTemplateModel } from "../models/laptop-price-template-model";

// Функция для определения типа прайса принтера на основе параметров
export function determinePrinterPriceType(
  device?: string,
  type?: string,
  format?: string,
  capacity?: number
): string | null {
  if (!device || !type || !format || capacity === undefined) {
    return null;
  }

  // Принтеры монохромные A4
  if (device === 'printer' && type === 'mono' && format === 'A4') {
    if (capacity < 9000) {
      return 'monoPrinter9kA4';
    } else if (capacity >= 9000 && capacity < 40000) {
      return 'monoPrinter10k40kA4';
    } else if (capacity >= 40000 && capacity < 100000) {
      return 'monoPrinter40k100kA4';
    } else if (capacity >= 100000 && capacity < 150000) {
      return 'monoPrinter100k150kA4';
    } else if (capacity >= 150000 && capacity < 225000) {
      return 'monoPrinter150k225kA4';
    } else if (capacity > 225000) {
      return 'monoPrinter225kA4';
    }
  }

  // Принтеры монохромные A3
  if (device === 'printer' && type === 'mono' && format === 'A3') {
    if (capacity < 65000) {
      return 'monoPrinter65kA3';
    } else if (capacity >= 65000 && capacity < 150000) {
      return 'monoPrinter65k150kA3';
    } else if (capacity > 150000) {
      return 'monoPrinter150kA3';
    }
  }

  // Принтеры цветные A4
  if (device === 'printer' && type === 'color' && format === 'A4') {
    if (capacity < 20000) {
      return 'colorPrinter20kA4';
    } else if (capacity >= 20000 && capacity < 60000) {
      return 'colorPrinter20k60kA4';
    } else if (capacity >= 60000 && capacity < 80000) {
      return 'colorPrinter60k80kA4';
    } else if (capacity >= 80000 && capacity < 100000) {
      return 'colorPrinter80k100kA4';
    } else if (capacity > 100000) {
      return 'colorPrinter100kA4';
    }
  }

  // Принтеры цветные A3
  if (device === 'printer' && type === 'color' && format === 'A3') {
    if (capacity < 75000) {
      return 'colorPrinter75kA3';
    } else if (capacity >= 75000 && capacity < 120000) {
      return 'colorPrinter75k120kA3';
    } else if (capacity > 120000) {
      return 'colorPrinter120kA3';
    }
  }

  // MFU монохромные A4
  if (device === 'MFU' && type === 'mono' && format === 'A4') {
    if (capacity < 9000) {
      return 'monoMFU9kA4';
    } else if (capacity >= 9000 && capacity < 15000) {
      return 'monoMFU9k15kA4';
    } else if (capacity >= 15000 && capacity < 50000) {
      return 'monoMFU15k50kA4';
    } else if (capacity >= 50000 && capacity < 75000) {
      return 'monoMFU50k75kA4';
    } else if (capacity >= 75000 && capacity < 130000) {
      return 'monoMFU75k130kA4';
    } else if (capacity >= 130000 && capacity < 200000) {
      return 'monoMFU130k200kA4';
    } else if (capacity > 200000) {
      return 'monoMFU200kA4';
    }
  }

  // MFU монохромные A3
  if (device === 'MFU' && type === 'mono' && format === 'A3') {
    if (capacity < 25000) {
      return 'monoMFU25kA3';
    } else if (capacity >= 25000 && capacity < 50000) {
      return 'monoMFU25k50kA3';
    } else if (capacity >= 50000 && capacity < 100000) {
      return 'monoMFU50k100kA3';
    } else if (capacity >= 100000 && capacity < 150000) {
      return 'monoMFU100k150kA3';
    } else if (capacity >= 150000 && capacity < 200000) {
      return 'monoMFU150k200kA3';
    } else if (capacity > 200000) {
      return 'monoMFU200kA3';
    }
  }

  // MFU цветные A3
  if (device === 'MFU' && type === 'color' && format === 'A3') {
    if (capacity < 75000) {
      return 'colorMFU75kA3';
    } else if (capacity >= 75000 && capacity < 120000) {
      return 'colorMFU75k120kA3';
    } else if (capacity >= 120000 && capacity < 200000) {
      return 'colorMFU120k200kA3';
    } else if (capacity > 200000) {
      return 'colorMFU200kA3';
    }
  }

  // MFU цветные A4
  if (device === 'MFU' && type === 'color' && format === 'A4') {
    if (capacity < 25000) {
      return 'colorMFU25kA4';
    } else if (capacity >= 25000 && capacity < 50000) {
      return 'colorMFU25k50kA4';
    } else if (capacity >= 50000 && capacity < 100000) {
      return 'colorMFU50k100kA4';
    } else if (capacity > 100000) {
      return 'colorMFU100kA4';
    }
  }

  return null;
}

// Функция для получения ID прайса принтера по типу
export async function getPrinterPriceId(priceType: string): Promise<string | null> {
  try {
    const priceTemplate = await PrinterPriceTemplateModel.findOne({ priceType });
    return priceTemplate ? priceTemplate._id.toString() : null;
  } catch (error) {
    console.error('Error getting printer price ID:', error);
    return null;
  }
}

// Функция для определения типа прайса ноутбука на основе параметров
export function determineLaptopPriceType(display?: number): string | null {
  if (display === undefined || display === null) {
    return null;
  }

  if (display >= 13 && display < 14) {
    return 'display1314';
  } else if (display >= 14 && display < 15) {
    return 'display1415';
  } else if (display >= 15 && display < 16) {
    return 'display1516';
  } else if (display >= 16 && display < 17) {
    return 'display1617';
  } else if (display >= 17 && display < 18) {
    return 'display1718';
  } else if (display >= 18) {
    return 'display18';
  }

  return null;
}

// Функция для получения ID прайса ноутбука по типу
export async function getLaptopPriceId(priceType: string): Promise<string | null> {
  try {
    const priceTemplate = await LaptopPriceTemplateModel.findOne({ priceType });
    return priceTemplate ? priceTemplate._id.toString() : null;
  } catch (error) {
    console.error('Error getting laptop price ID:', error);
    return null;
  }
}

