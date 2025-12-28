/**
 * Утилиты для генерации SEO предложений для устройств (принтеры, картриджи, ноутбуки)
 */

/**
 * Обрезает текст до указанной длины, добавляя многоточие
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

export interface DeviceSeoSuggestions {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

/**
 * Генерирует SEO предложения для принтера
 */
export function generatePrinterSeoSuggestions(
  vendor: string,
  model: string,
  device?: string,
  type?: string,
  format?: string,
  speed?: number,
  capacity?: number
): DeviceSeoSuggestions {
  const vendorUpper = vendor.toUpperCase();
  const modelUpper = model.toUpperCase();
  const deviceText = device === 'MFU' ? 'МФУ' : device === 'printer' ? 'принтера' : 'устройства';
  const typeText = type === 'mono' ? 'монохромного' : type === 'color' ? 'цветного' : '';
  const formatText = format ? `формата ${format}` : '';
  const speedText = speed ? `со скоростью ${speed} стр/мин` : '';
  const capacityText = capacity ? `нагрузкой до ${capacity} стр/месяц` : '';

  // SEO Title (50-60 символов)
  let seoTitle = `Ремонт ${vendorUpper} ${modelUpper} в СПб`;
  if (seoTitle.length > 60) {
    seoTitle = `Ремонт ${modelUpper} в СПб`;
  }
  if (seoTitle.length > 60) {
    seoTitle = truncate(seoTitle, 60);
  }

  // SEO Description (150-160 символов)
  const parts: string[] = [];
  if (typeText) parts.push(typeText);
  if (deviceText !== 'устройства') parts.push(deviceText);
  parts.push(`${vendorUpper} ${modelUpper}`);
  if (formatText) parts.push(formatText);
  if (speedText) parts.push(speedText);
  if (capacityText) parts.push(capacityText);

  let seoDescription = `Ремонт ${parts.join(' ')} в Санкт-Петербурге. Выезд мастера. Гарантия. Профессиональный сервис.`;
  if (seoDescription.length > 160) {
    seoDescription = `Ремонт ${deviceText} ${vendorUpper} ${modelUpper} в Санкт-Петербурге. Выезд мастера. Гарантия.`;
  }
  if (seoDescription.length > 160) {
    seoDescription = truncate(seoDescription, 160);
  }

  // SEO Keywords
  const keywords: string[] = [];
  keywords.push(`ремонт ${modelUpper.toLowerCase()}`);
  keywords.push(`ремонт ${deviceText} ${vendorUpper.toLowerCase()}`);
  keywords.push(`${vendorUpper.toLowerCase()} ${modelUpper.toLowerCase()}`);
  if (typeText) keywords.push(`ремонт ${typeText} ${deviceText}`);
  if (formatText) keywords.push(`ремонт ${formatText}`);
  keywords.push('ремонт принтеров спб');
  keywords.push('ремонт мфу спб');
  keywords.push('ремонт принтеров санкт-петербург');
  keywords.push('выезд мастера');
  keywords.push('ремонт оргтехники');

  return {
    seoTitle,
    seoDescription,
    seoKeywords: keywords.join(', '),
  };
}

/**
 * Генерирует SEO предложения для картриджа
 */
export function generateCartridgeSeoSuggestions(
  vendor: string,
  modelCart: string,
  devices?: string,
  refillPrice?: string | number,
  recoveryPrice?: string | number
): DeviceSeoSuggestions {
  const vendorUpper = vendor.toUpperCase();
  const modelUpper = modelCart.toUpperCase();
  const refillPriceText = refillPrice ? `${refillPrice}₽` : '';
  const recoveryPriceText = recoveryPrice ? `${recoveryPrice}₽` : '';

  // SEO Title (50-60 символов)
  let seoTitle = `Заправка ${modelUpper} в СПб`;
  if (seoTitle.length > 60) {
    seoTitle = truncate(seoTitle, 60);
  }

  // SEO Description (150-160 символов)
  let seoDescription = `Заправка картриджа ${vendorUpper} ${modelUpper} в Санкт-Петербурге`;
  if (refillPriceText) {
    seoDescription += `. Цена заправки ${refillPriceText}`;
  }
  if (recoveryPriceText) {
    seoDescription += `, восстановление ${recoveryPriceText}`;
  }
  seoDescription += `. Выезд мастера. Гарантия.`;
  if (seoDescription.length > 160) {
    seoDescription = `Заправка картриджа ${vendorUpper} ${modelUpper} в СПб. Выезд мастера. Гарантия.`;
  }
  if (seoDescription.length > 160) {
    seoDescription = truncate(seoDescription, 160);
  }

  // SEO Keywords
  const keywords: string[] = [];
  keywords.push(`заправка ${modelUpper.toLowerCase()}`);
  keywords.push(`заправка картриджа ${vendorUpper.toLowerCase()}`);
  keywords.push(`${vendorUpper.toLowerCase()} ${modelUpper.toLowerCase()}`);
  keywords.push('заправка картриджей спб');
  keywords.push('заправка картриджей санкт-петербург');
  keywords.push('заправка картриджей выезд');
  if (devices) {
    const deviceNames = devices.split(',').map(d => d.trim()).filter(d => d);
    deviceNames.forEach(device => {
      if (device.length > 3) {
        keywords.push(`заправка для ${device.toLowerCase()}`);
      }
    });
  }
  keywords.push('восстановление картриджа');
  keywords.push('ремонт картриджей');

  return {
    seoTitle,
    seoDescription,
    seoKeywords: keywords.join(', '),
  };
}

/**
 * Генерирует SEO предложения для ноутбука
 */
export function generateLaptopSeoSuggestions(
  vendor: string,
  model: string,
  series?: string,
  processorVendor?: string,
  processorName?: string,
  display?: number,
  ram?: number
): DeviceSeoSuggestions {
  const vendorUpper = vendor.toUpperCase();
  const modelUpper = model.toUpperCase();
  const seriesText = series ? `${series} ` : '';
  const processorText = processorVendor && processorName 
    ? `${processorVendor} ${processorName}` 
    : processorVendor || '';
  const displayText = display ? `${display}"` : '';
  const ramText = ram ? `${ram} ГБ` : '';

  // SEO Title (50-60 символов)
  let seoTitle = `Ремонт ноутбука ${vendorUpper} ${seriesText}${modelUpper} в СПб`;
  if (seoTitle.length > 60) {
    seoTitle = `Ремонт ${vendorUpper} ${modelUpper} в СПб`;
  }
  if (seoTitle.length > 60) {
    seoTitle = truncate(seoTitle, 60);
  }

  // SEO Description (150-160 символов)
  const parts: string[] = [];
  parts.push(`Ремонт ноутбука ${vendorUpper} ${seriesText}${modelUpper}`);
  if (processorText) parts.push(`процессор ${processorText}`);
  if (displayText) parts.push(`экран ${displayText}`);
  if (ramText) parts.push(`ОЗУ ${ramText}`);

  let seoDescription = `${parts.join(', ')} в Санкт-Петербурге. Выезд мастера. Гарантия. Профессиональный сервис.`;
  if (seoDescription.length > 160) {
    seoDescription = `Ремонт ноутбука ${vendorUpper} ${modelUpper} в СПб. Выезд мастера. Гарантия.`;
  }
  if (seoDescription.length > 160) {
    seoDescription = truncate(seoDescription, 160);
  }

  // SEO Keywords
  const keywords: string[] = [];
  keywords.push(`ремонт ноутбука ${modelUpper.toLowerCase()}`);
  keywords.push(`ремонт ноутбука ${vendorUpper.toLowerCase()}`);
  keywords.push(`${vendorUpper.toLowerCase()} ${modelUpper.toLowerCase()}`);
  if (series) keywords.push(`${series.toLowerCase()} ${modelUpper.toLowerCase()}`);
  keywords.push('ремонт ноутбуков спб');
  keywords.push('ремонт ноутбуков санкт-петербург');
  keywords.push('ремонт ноутбуков выезд');
  keywords.push('ремонт ноутбука на дому');
  keywords.push('чистка ноутбука');
  keywords.push('установка windows');
  keywords.push('удаление вирусов');

  return {
    seoTitle,
    seoDescription,
    seoKeywords: keywords.join(', '),
  };
}

/**
 * Проверяет, можно ли сгенерировать предложения для принтера
 */
export function canGeneratePrinterSuggestions(vendor: string, model: string): boolean {
  return !!(vendor && vendor.trim() && model && model.trim());
}

/**
 * Проверяет, можно ли сгенерировать предложения для картриджа
 */
export function canGenerateCartridgeSuggestions(vendor: string, modelCart: string): boolean {
  return !!(vendor && vendor.trim() && modelCart && modelCart.trim());
}

/**
 * Проверяет, можно ли сгенерировать предложения для ноутбука
 */
export function canGenerateLaptopSuggestions(vendor: string, model: string): boolean {
  return !!(vendor && vendor.trim() && model && model.trim());
}

