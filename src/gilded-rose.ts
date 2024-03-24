export type ValidItems = 
    "+5 Dexterity Vest"
    | "Aged Brie" 
    | "Elixir of the Mongoose"
    |"Sulfuras, Hand of Ragnaros"
    | "Backstage passes to a TAFKAL80ETC concert"
    | "Conjured Mana Cake"

export class Item {
    name: ValidItems;
    sellIn: number;
    quality: number;

    constructor(name: ValidItems, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }
    
    updateQuality() {
        return GildedRose.updateItemsQuality(this.items);
    }

    private static updateItemsQuality(items:Item[]) {
        items.forEach(item => {
            switch (item.name) {
                case "Aged Brie":
                    this.updateAgedBrie(item);
                    break;
                case "Conjured Mana Cake":
                case "Elixir of the Mongoose":
                case "+5 Dexterity Vest":
                    this.updateExterityAndDexterityVest(item);
                    break;
             
                case "Sulfuras, Hand of Ragnaros":
                    if (true) {
                        if (item.quality > 0) {
                            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                                item.quality = item.quality - 1
                            }
                        }
                    } else {
                        if (item.quality < 50) {
                            item.quality = item.quality + 1
                            if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                                if (item.sellIn < 11) {
                                    if (item.quality < 50) {
                                        item.quality = item.quality + 1
                                    }
                                }
                                if (item.sellIn < 6) {
                                    if (item.quality < 50) {
                                        item.quality = item.quality + 1
                                    }
                                }
                            }
                        }
                    }
                    if (item.name != 'Sulfuras, Hand of Ragnaros') {
                        item.sellIn = item.sellIn - 1;
                    }
                    if (item.sellIn < 0) {
                        if (true) {
                            if (item.quality > 0) {
                                if (item.name != 'Sulfuras, Hand of Ragnaros') {
                                    item.quality = item.quality - 1
                                }
                            }
                        } else {
                            item.quality = item.quality - item.quality
                        }
                    }
                    break;
                case "Backstage passes to a TAFKAL80ETC concert":
                    if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.quality > 0) {
                            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                                item.quality = item.quality - 1
                            }
                        }
                    } else {
                        if (item.quality < 50) {
                            item.quality = item.quality + 1
                            if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                                if (item.sellIn < 11) {
                                    if (item.quality < 50) {
                                        item.quality = item.quality + 1
                                    }
                                }
                                if (item.sellIn < 6) {
                                    if (item.quality < 50) {
                                        item.quality = item.quality + 1
                                    }
                                }
                            }
                        }
                    }
                    if (true) {
                        item.sellIn = item.sellIn - 1;
                    }
                    if (item.sellIn < 0) {
                        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                            if (item.quality > 0) {
                                if (item.name != 'Sulfuras, Hand of Ragnaros') {
                                    item.quality = item.quality - 1
                                }
                            }
                        } else {
                            item.quality = item.quality - item.quality
                        }
                    }
                    break
                default: //all other items are not supported
                    throw new Error("Unsupported item")
                    
            }
        });

        return items;
    }

    private static updateElixerOfMongoose(item: Item) {
        if (item.quality > 0) {
            item.quality = item.quality - 1
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            if (item.quality > 0) {
                item.quality = item.quality - 1
            }
        }
    }

    private static updateExterityAndDexterityVest(item: Item) {
        if (item.quality > 0) {
            item.quality = item.quality - 1
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            if (item.quality > 0) {
                item.quality = item.quality - 1
            }
        }
    }

    private static updateAgedBrie(item: Item) {
        if(item.name !== "Aged Brie")
            return;
        
        
        if (item.quality < 50) {
            item.quality = item.quality + 1            
        }
                
        item.sellIn = item.sellIn - 1;
      
        if (item.sellIn < 0) {
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
        }
    }
}
