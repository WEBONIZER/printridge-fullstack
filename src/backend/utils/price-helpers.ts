// Функции для определения прайсов на основе характеристик устройств

// Импорт констант для принтеров
async function getPrinterPriceConstants() {
  const {
    monoPrinter9kA4,
    monoPrinter10k40kA4,
    monoPrinter40k100kA4,
    monoPrinter100k150kA4,
    monoPrinter150k225kA4,
    monoPrinter225kA4,
    monoPrinter65kA3,
    monoPrinter65k150kA3,
    monoPrinter150kA3,
    colorPrinter20kA4,
    colorPrinter20k60kA4,
    colorPrinter60k80kA4,
    colorPrinter80k100kA4,
    colorPrinter100kA4,
    colorPrinter75kA3,
    colorPrinter75k120kA3,
    colorPrinter120kA3,
    monoMFU9kA4,
    monoMFU9k15kA4,
    monoMFU15k50kA4,
    monoMFU50k75kA4,
    monoMFU75k130kA4,
    monoMFU130k200kA4,
    monoMFU200kA4,
    monoMFU25kA3,
    monoMFU25k50kA3,
    monoMFU50k100kA3,
    monoMFU100k150kA3,
    monoMFU150k200kA3,
    monoMFU200kA3,
    colorMFU75kA3,
    colorMFU75k120kA3,
    colorMFU120k200kA3,
    colorMFU200kA3,
    colorMFU25kA4,
    colorMFU25k50kA4,
    colorMFU50k100kA4,
    colorMFU100kA4,
  } = await import("../../frontend/utils/repair-constants.js");
  
  return {
    monoPrinter9kA4,
    monoPrinter10k40kA4,
    monoPrinter40k100kA4,
    monoPrinter100k150kA4,
    monoPrinter150k225kA4,
    monoPrinter225kA4,
    monoPrinter65kA3,
    monoPrinter65k150kA3,
    monoPrinter150kA3,
    colorPrinter20kA4,
    colorPrinter20k60kA4,
    colorPrinter60k80kA4,
    colorPrinter80k100kA4,
    colorPrinter100kA4,
    colorPrinter75kA3,
    colorPrinter75k120kA3,
    colorPrinter120kA3,
    monoMFU9kA4,
    monoMFU9k15kA4,
    monoMFU15k50kA4,
    monoMFU50k75kA4,
    monoMFU75k130kA4,
    monoMFU130k200kA4,
    monoMFU200kA4,
    monoMFU25kA3,
    monoMFU25k50kA3,
    monoMFU50k100kA3,
    monoMFU100k150kA3,
    monoMFU150k200kA3,
    monoMFU200kA3,
    colorMFU75kA3,
    colorMFU75k120kA3,
    colorMFU120k200kA3,
    colorMFU200kA3,
    colorMFU25kA4,
    colorMFU25k50kA4,
    colorMFU50k100kA4,
    colorMFU100kA4,
  };
}

// Функция для определения прайса принтера
export async function getPrinterPrice(device?: string, type?: string, format?: string, capacity?: number) {
  if (!device || !type || !format || capacity === undefined) {
    return null;
  }

  const constants = await getPrinterPriceConstants();

  // Принтеры монохромные A4
  if (device === 'printer' && type === 'mono' && format === 'A4') {
    if (capacity < 9000) {
      return constants.monoPrinter9kA4;
    } else if (capacity >= 9000 && capacity < 40000) {
      return constants.monoPrinter10k40kA4;
    } else if (capacity >= 40000 && capacity < 100000) {
      return constants.monoPrinter40k100kA4;
    } else if (capacity >= 100000 && capacity < 150000) {
      return constants.monoPrinter100k150kA4;
    } else if (capacity >= 150000 && capacity < 225000) {
      return constants.monoPrinter150k225kA4;
    } else if (capacity > 225000) {
      return constants.monoPrinter225kA4;
    }
  }

  // Принтеры монохромные A3
  if (device === 'printer' && type === 'mono' && format === 'A3') {
    if (capacity < 65000) {
      return constants.monoPrinter65kA3;
    } else if (capacity >= 65000 && capacity < 150000) {
      return constants.monoPrinter65k150kA3;
    } else if (capacity > 150000) {
      return constants.monoPrinter150kA3;
    }
  }

  // Принтеры цветные A4
  if (device === 'printer' && type === 'color' && format === 'A4') {
    if (capacity < 20000) {
      return constants.colorPrinter20kA4;
    } else if (capacity >= 20000 && capacity < 60000) {
      return constants.colorPrinter20k60kA4;
    } else if (capacity >= 60000 && capacity < 80000) {
      return constants.colorPrinter60k80kA4;
    } else if (capacity >= 80000 && capacity < 100000) {
      return constants.colorPrinter80k100kA4;
    } else if (capacity > 100000) {
      return constants.colorPrinter100kA4;
    }
  }

  // Принтеры цветные A3
  if (device === 'printer' && type === 'color' && format === 'A3') {
    if (capacity < 75000) {
      return constants.colorPrinter75kA3;
    } else if (capacity >= 75000 && capacity < 120000) {
      return constants.colorPrinter75k120kA3;
    } else if (capacity > 120000) {
      return constants.colorPrinter120kA3;
    }
  }

  // MFU монохромные A4
  if (device === 'MFU' && type === 'mono' && format === 'A4') {
    if (capacity < 9000) {
      return constants.monoMFU9kA4;
    } else if (capacity >= 9000 && capacity < 15000) {
      return constants.monoMFU9k15kA4;
    } else if (capacity >= 15000 && capacity < 50000) {
      return constants.monoMFU15k50kA4;
    } else if (capacity >= 50000 && capacity < 75000) {
      return constants.monoMFU50k75kA4;
    } else if (capacity >= 75000 && capacity < 130000) {
      return constants.monoMFU75k130kA4;
    } else if (capacity >= 130000 && capacity < 200000) {
      return constants.monoMFU130k200kA4;
    } else if (capacity > 200000) {
      return constants.monoMFU200kA4;
    }
  }

  // MFU монохромные A3
  if (device === 'MFU' && type === 'mono' && format === 'A3') {
    if (capacity < 25000) {
      return constants.monoMFU25kA3;
    } else if (capacity >= 25000 && capacity < 50000) {
      return constants.monoMFU25k50kA3;
    } else if (capacity >= 50000 && capacity < 100000) {
      return constants.monoMFU50k100kA3;
    } else if (capacity >= 100000 && capacity < 150000) {
      return constants.monoMFU100k150kA3;
    } else if (capacity >= 150000 && capacity < 200000) {
      return constants.monoMFU150k200kA3;
    } else if (capacity > 200000) {
      return constants.monoMFU200kA3;
    }
  }

  // MFU цветные A3
  if (device === 'MFU' && type === 'color' && format === 'A3') {
    if (capacity < 75000) {
      return constants.colorMFU75kA3;
    } else if (capacity >= 75000 && capacity < 120000) {
      return constants.colorMFU75k120kA3;
    } else if (capacity >= 120000 && capacity < 200000) {
      return constants.colorMFU120k200kA3;
    } else if (capacity > 200000) {
      return constants.colorMFU200kA3;
    }
  }

  // MFU цветные A4
  if (device === 'MFU' && type === 'color' && format === 'A4') {
    if (capacity < 25000) {
      return constants.colorMFU25kA4;
    } else if (capacity >= 25000 && capacity < 50000) {
      return constants.colorMFU25k50kA4;
    } else if (capacity >= 50000 && capacity < 100000) {
      return constants.colorMFU50k100kA4;
    } else if (capacity > 100000) {
      return constants.colorMFU100kA4;
    }
  }

  return null;
}

// Функция для определения прайса ноутбука
export async function getLaptopPrice(display?: number) {
  if (display === undefined || display === null) {
    return null;
  }

  const {
    display1314,
    display1415,
    display1516,
    display1617,
    display1718,
    display18,
  } = await import("../../frontend/utils/laptops-constants.js");

  if (display >= 13 && display < 14) {
    return display1314;
  } else if (display >= 14 && display < 15) {
    return display1415;
  } else if (display >= 15 && display < 16) {
    return display1516;
  } else if (display >= 16 && display < 17) {
    return display1617;
  } else if (display >= 17 && display < 18) {
    return display1718;
  } else if (display >= 18) {
    return display18;
  }

  return null;
}

