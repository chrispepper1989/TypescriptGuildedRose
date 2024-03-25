const validItems =
    <const>["+5 Dexterity Vest"
    ,"Aged Brie" 
    ,"Elixir of the Mongoose"
    ,"Sulfuras, Hand of Ragnaros"
    ,"Backstage passes to a TAFKAL80ETC concert"
    ,"Conjured Mana Cake"]

type ValidItem = typeof validItems[number]; 

function isValidItem(str: string): str is ValidItem {
    return !!validItems.find((lit) => str === lit);
}
const clamp = (number: number, 
               min: number, max: number) => Math.min(Math.max(number, min), max)


export function createItem(name: ValidItem, sellIn: number, quality: number) {
    return new Item(name,sellIn,quality)
}

// Req: do not alter the Item class or Items (whoops)
export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;
    private static readonly maxQuality = 50;
    constructor(items = [] as Array<Item>) {
        this.items = items;
    }
    
    updateQuality() {
        return GildedRose.updateItemsQualityAndSellIn(this.items);
    }


    static updateItem(item: Item) {
        if(!isValidItem(item.name))
            return;
        
        const name:ValidItem = item.name;
        switch (name) {
            case "Aged Brie":
                this.updateAgedBrieQualityAndSellIn(item);
                break;
            case "Conjured Mana Cake":
                this.updateConjuredManaCakeQualityAndSellIn(item);
                break;          


            case "Backstage passes to a TAFKAL80ETC concert":
                this.updateBackStagePassQualityAndSellIn(item);
                break
            case "Sulfuras, Hand of Ragnaros":
                //legendary do nothing
                break;
            default:
            case "Elixir of the Mongoose":
            case "+5 Dexterity Vest":
                this.updateNormalItemQualityAndSellIn(item);
                break;
           

        }
        
        
    }
    private static updateItemsQualityAndSellIn(items:Item[]) {       

        items.forEach(item => this.updateItem(item));
        return items;
    }


    private static updateBackStagePassQualityAndSellIn(item: Item) {
        //increases by 3 when there are 5 days or less
        //2 when there are 10 days or less and
        // otherwise 1 as normal
        const qualityIncrease = item.sellIn < 6 ? 3
            : item.sellIn < 11 ? 2 
            : 1        
                      
        if (item.quality < GildedRose.maxQuality) {
            item.quality += qualityIncrease;           
    
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
            item.quality = 0
        }
    }

    public static updateNormalItemQualityAndSellIn(item: Item) {
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
    
    private static updateAgedBrieQualityAndSellIn(item: Item) {          
        
        if (item.quality < GildedRose.maxQuality) {
            item.quality = item.quality + 1            
        }
                
        item.sellIn = item.sellIn - 1;
      
        if (item.sellIn < 0) {
            if (item.quality < GildedRose.maxQuality) {
                item.quality = item.quality + 1
            }
        }
    }

    public static updateConjuredManaCakeQualityAndSellIn(item: Item) {
        //"Conjured" items degrade in Quality twice as fast as normal items
        return this.updateNormalItemQualityAndSellIn(item);
    }
}
