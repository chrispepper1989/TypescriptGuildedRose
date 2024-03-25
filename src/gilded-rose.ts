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

type QualityMutator =
{
    qualityMultiplier: number;
    qualityChange: 3 | 2 | 1 | -1;
}



export class GildedRose {
    items: Array<Item>;
    //technically items can be above max quality if they stat there
    private static readonly maxIncreasableQuality = 50;
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
        
        if(name == "Sulfuras, Hand of Ragnaros")
            // legendary item, do nothing
            return;
        
        
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

    private static updateQuality(item: Item, qualityChange: number) {
        item.quality += qualityChange

        if (item.sellIn < 0) {
            item.quality += qualityChange
        }
    }
    

    private static updateBackStagePassQualityAndSellIn(item: Item) {

        item.sellIn -= 1;
        if (item.sellIn < 0) {
            item.quality = 0
            return;
        }
        if (item.quality >= GildedRose.maxIncreasableQuality) {
            return
        }
        //increases by 3 when there are 5 days or less
        //2 when there are 10 days or less and
        // otherwise 1 as normal
        const qualityIncrease = (item.sellIn+1) < 6 ? 3
            : (item.sellIn+1) < 11 ? 2 
            : 1
        
       
        item.quality += qualityIncrease;
    }
   
    public static updateNormalItemQualityAndSellIn(item: Item, qualityChange: number = -1) {

        item.sellIn -= 1;

        if(item.quality <= 0)
            return;

        this.updateQuality(item, qualityChange);

    }
    

    private static updateAgedBrieQualityAndSellIn(item: Item) {
        
        item.sellIn -= 1;

        if(item.quality >= GildedRose.maxIncreasableQuality)
            return;

        this.updateQuality(item, 1);
    }

    public static updateConjuredManaCakeQualityAndSellIn(item: Item) {
        //"Conjured" items degrade in Quality twice as fast as normal items
        this.updateNormalItemQualityAndSellIn(item, -2);
   
    }
}
