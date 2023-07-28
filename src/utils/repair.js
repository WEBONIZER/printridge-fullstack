import { repairPrintersPrice } from './repair-price';
import {
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
} from './repair-constants'


export const repair = repairPrintersPrice.map(i => {
    if (i.device === 'printer' && i.type === 'mono' && i.format === 'A4' && i.capacity < 9000) {
        i.price = monoPrinter9kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 9000 && i.capacity < 40000)) {
        i.price = monoPrinter10k40kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 40000 && i.capacity < 100000)) {
        i.price = monoPrinter40k100kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 100000 && i.capacity < 150000)) {
        i.price = monoPrinter100k150kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 150000 && i.capacity < 225000)) {
        i.price = monoPrinter150k225kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'mono' && i.format === 'A4' && i.capacity > 225000)) {
        i.price = monoPrinter225kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'mono' && i.format === 'A3' && i.capacity < 65000)) {
        i.price = monoPrinter65kA3;
        return i;
    } else if ((i.device === 'printer' && i.type === 'mono' && i.format === 'A3' && i.capacity >= 65000 && i.capacity < 150000)) {
        i.price = monoPrinter65k150kA3;
        return i;
    } else if ((i.device === 'printer' && i.type === 'mono' && i.format === 'A3' && i.capacity > 150000)) {
        i.price = monoPrinter150kA3;
        return i;
    } else if ((i.device === 'printer' && i.type === 'color' && i.format === 'A4' && i.capacity < 20000)) {
        i.price = colorPrinter20kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'color' && i.format === 'A4' && i.capacity >= 20000 && i.capacity < 60000)) {
        i.price = colorPrinter20k60kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'color' && i.format === 'A4' && i.capacity >= 60000 && i.capacity < 80000)) {
        i.price = colorPrinter60k80kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'color' && i.format === 'A4' && i.capacity >= 80000 && i.capacity < 100000)) {
        i.price = colorPrinter80k100kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'color' && i.format === 'A4' && i.capacity > 100000)) {
        i.price = colorPrinter100kA4;
        return i;
    } else if ((i.device === 'printer' && i.type === 'color' && i.format === 'A3' && i.capacity < 75000)) {
        i.price = colorPrinter75kA3;
        return i;
    } else if ((i.device === 'printer' && i.type === 'color' && i.format === 'A3' && i.capacity >= 75000 && i.capacity < 120000)) {
        i.price = colorPrinter75k120kA3;
        return i;
    } else if ((i.device === 'printer' && i.type === 'color' && i.format === 'A3' && i.capacity > 120000)) {
        i.price = colorPrinter120kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A4' && i.capacity < 9000)) {
        i.price = monoMFU9kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 9000 && i.capacity < 15000)) {
        i.price = monoMFU9k15kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 15000 && i.capacity < 50000)) {
        i.price = monoMFU15k50kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 50000 && i.capacity < 75000)) {
        i.price = monoMFU50k75kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 75000 && i.capacity < 130000)) {
        i.price = monoMFU75k130kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A4' && i.capacity >= 130000 && i.capacity < 200000)) {
        i.price = monoMFU130k200kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A4' && i.capacity > 200000)) {
        i.price = monoMFU200kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A3' && i.capacity < 25000)) {
        i.price = monoMFU25kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A3' && i.capacity >= 25000 && i.capacity < 50000)) {
        i.price = monoMFU25k50kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A3' && i.capacity >= 50000 && i.capacity < 100000)) {
        i.price = monoMFU50k100kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A3' && i.capacity >= 100000 && i.capacity < 150000)) {
        i.price = monoMFU100k150kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A3' && i.capacity >= 150000 && i.capacity < 200000)) {
        i.price = monoMFU150k200kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'mono' && i.format === 'A3' && i.capacity > 200000)) {
        i.price = monoMFU200kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'color' && i.format === 'A3' && i.capacity < 75000)) {
        i.price = colorMFU75kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'color' && i.format === 'A3' && i.capacity >= 75000 && i.capacity < 120000)) {
        i.price = colorMFU75k120kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'color' && i.format === 'A3' && i.capacity >= 120000 && i.capacity < 200000)) {
        i.price = colorMFU120k200kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'color' && i.format === 'A3' && i.capacity > 200000)) {
        i.price = colorMFU200kA3;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'color' && i.format === 'A4' && i.capacity < 25000)) {
        i.price = colorMFU25kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'color' && i.format === 'A4' && i.capacity >= 25000 && i.capacity < 50000)) {
        i.price = colorMFU25k50kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'color' && i.format === 'A4' && i.capacity >= 50000 && i.capacity < 100000)) {
        i.price = colorMFU50k100kA4;
        return i;
    } else if ((i.device === 'MFU' && i.type === 'color' && i.format === 'A4' && i.capacity > 100000)) {
        i.price = colorMFU100kA4;
        return i;
    }
})

