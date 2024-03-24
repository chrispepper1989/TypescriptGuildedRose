export type ValidItems = 
    "+5 Dexterity Vest"
    | "Aged Brie" 
    | "Elixir of the Mongoose"
    |"Sulfuras, Hand of Ragnaros"
    | "Backstage passes to a TAFKAL80ETC concert"
    | "Conjured Mana Cake"


export function createItem(name:ValidItems, sellIn:number,quality:number):Item
{
    return {name,sellIn,quality}
}
export type Item = {
    name: ValidItems;
    sellIn: number;
    quality: number;
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
             
               
                case "Backstage passes to a TAFKAL80ETC concert":
                    item = this.updateBackStagePass(item);
                    break
                case "Sulfuras, Hand of Ragnaros":
                default:
                    //all other items, do nothing
                    
            }
        });

        return items;
    }


    private static updateBackStagePass( item:Item):Item {
       
        if (item.quality < 50) {
            item.quality = item.quality + 1
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
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            item.quality = item.quality - item.quality
        }
        return item;
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
