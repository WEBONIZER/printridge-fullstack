import { laptopRepairPrice } from './laptops-price';
import {
    display1314,
    display1415,
    display1516,
    display1617,
    display1718,
    display18,
} from './laptops-constants'


export const repairLaptops = laptopRepairPrice.map(i => {
    if ((i.display  >= 13 && i.display < 14)) {
        i.price = display1314;
        return i;
    } else if ((i.display  >= 14 && i.display < 15)) {
        i.price = display1415;
        return i;
    } else if ((i.display >= 15 && i.display < 16)) {
        i.price = display1516;
        return i;
    } else if ((i.display >= 16 && i.display < 17)) {
        i.price = display1617;
        return i;
    } else if ((i.display >= 17 && i.display < 18)) {
        i.price = display1718;
        return i;
    } else if ((i.display >= 18)) {
        i.price = display18;
        return i;
    } else {
        return i;
    }
})

