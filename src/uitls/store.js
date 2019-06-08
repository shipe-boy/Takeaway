//数据的存取
export function saveToLocal(id, key, value) {
    let seller = window.localStorage.__seller__;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
}

export function loadFromLocal(id, key, deft) {
    let seller = window.localStorage.__seller__;
    if (!seller) {
        return deft;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return deft;
    }
    let value = seller[key]
    if (!value) {
        return deft;
    }
    return value;
}