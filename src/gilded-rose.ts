/*
Helper functions and types to remove string based errors
 */
const validItems =
    <const>["+5 Dexterity Vest"
        , "Aged Brie"
        , "Elixir of the Mongoose"
        , "Sulfuras, Hand of Ragnaros"
        , "Backstage passes to a TAFKAL80ETC concert"
        , "Conjured Mana Cake"]

type ValidItem = typeof validItems[number];

function isValidItem(str: string): str is ValidItem {
    return !!validItems.find((lit) => str === lit);
}


export function createItem(name: ValidItem, sellIn: number, quality: number) {
    return new Item(name, sellIn, quality)
}

/*
End of helper functions
 */

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
    //technically items can be above max quality if they stat there
    private static readonly maxIncreasableQuality = 50;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() : Readonly<Array<Item>> {
        const newItems = GildedRose.getItemsAfterDayPassed(this.items);
        //update internal items
        this.items = newItems;
        return newItems;
    }

    public static getItemsAfterDayPassed(items: Readonly<Array<Item>>) : Item[] {
        
        return items.map( item => this.getItemAfterDayPassed(item));
    }

    static getItemAfterDayPassed(item: Readonly<Item>) : Item {
        if (!isValidItem(item.name))
            return item;

        const name: ValidItem = item.name;

        if (name === "Sulfuras, Hand of Ragnaros")
            // legendary item, do nothing
            return item;

    
        // all other items assume day has passed and sellin is reduced
        const newSellIn = item.sellIn - 1;
     
        
        switch (name) {

            case "Aged Brie": {
                const newQuality = this.getNewAgedBrieQuality({
                    sellIn: newSellIn,
                    quality: item.quality,
                    name: item.name
                });
                return new Item(item.name, newSellIn, newQuality);
            }
            case "Conjured Mana Cake": {
                const newQuality = this.getNewConjuredManaCakeQuality({
                    sellIn: newSellIn,
                    quality: item.quality,
                    name: item.name
                });
                return new Item(item.name, newSellIn, newQuality);
            }
            case "Backstage passes to a TAFKAL80ETC concert": {
                const newQuality = this.getNewBackStagePassQuality(item.quality, item.sellIn,newSellIn);
                return new Item(item.name, newSellIn, newQuality);
            }
            
            case "Elixir of the Mongoose":
            case "+5 Dexterity Vest":
            default:
            {
                const newQuality = this.getNewNormalItemQuality({sellIn:newSellIn, quality:item.quality, name:item.name});
                return new Item(item.name, newSellIn, newQuality );
            }
        }       

    }

 

    private static updateQuality(item: Readonly<Item>, qualityChange: number) :number {
        //when the sellin is less than 0 (past best before) quality degrades twice as fast
        return item.sellIn < 0 ? item.quality + (qualityChange*2) : item.quality + qualityChange;        
    }


    private static getNewBackStagePassQuality(currentQuality:number, currentSellIn:number, newSellIn:number) :number {

        /*
        Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;

        Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
        Quality drops to 0 after the concert
         */
        if (newSellIn < 0) {
            return 0;
        }
        if (currentQuality >= GildedRose.maxIncreasableQuality) {
            return currentQuality;
        }
        //increases by 3 when there are 5 days or less
        //2 when there are 10 days or less and
        // otherwise 1 as normal
        const daysRemaining = currentSellIn;
        const qualityIncrease =
            daysRemaining < 6 ? 3
                : daysRemaining < 11 ? 2
                    : 1

        return currentQuality + qualityIncrease;       
      
    }

    public static getNewNormalItemQuality(item: Readonly<Item>, qualityChange: number = -1) :number {
         
        if (item.quality <= 0)
            return item.quality;

        return this.updateQuality(item, qualityChange);

    }

    private static getNewAgedBrieQuality(item: Readonly<Item>):number {
        //"Aged Brie" actually increases in Quality the older it gets
        if (item.quality >= GildedRose.maxIncreasableQuality)
            return item.quality;

        return this.updateQuality(item, 1);
    }

    public static getNewConjuredManaCakeQuality(item: Readonly<Item>):number {
        //"Conjured" items degrade in Quality twice as fast as normal items
        return this.getNewNormalItemQuality(item, -2);

    }
}
