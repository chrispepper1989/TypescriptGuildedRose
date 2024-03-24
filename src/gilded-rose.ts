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
                    this.updateAgedBrieItem(item);
                    break;
                case "+5 Dexterity Vest":
                    this.updateOtherItems(item);
                    break;
                case "Elixir of the Mongoose":                  
                case "Sulfuras, Hand of Ragnaros":             
                case "Backstage passes to a TAFKAL80ETC concert":
                case "Conjured Mana Cake":
                default:
                    this.updateOtherItems(item);
                    break;
            }
        });

        return items;
    }

    private static updateAgedBrieItem(item: Item) {
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
    
    private static updateOtherItems(item: Item) {
        if(item.name === "Aged Brie")
            return;
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
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
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
    }
}
