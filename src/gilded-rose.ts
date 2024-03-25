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
        const newItems = GildedRose.updateItemsQualityAndSellIn(this.items);
        //update internal items
        this.items = newItems;
        return newItems;
    }

    private static updateItemsQualityAndSellIn(items: Readonly<Array<Item>>) {
        //items.forEach(item => this.updateItem(item));
        return items.map( item => this.updateItem(item));
    }

    static updateItem(item: Readonly<Item>) : Item {
        if (!isValidItem(item.name))
            return item;

        const name: ValidItem = item.name;

        if (name === "Sulfuras, Hand of Ragnaros")
            // legendary item, do nothing
            return item;

    
        const newSellIn = item.sellIn - 1;
     
        
        switch (name) {

            case "Aged Brie": {
                const newQuality = this.updateAgedBrieQuality({
                    sellIn: newSellIn,
                    quality: item.quality,
                    name: item.name
                });
                return new Item(item.name, newSellIn, newQuality);
            }
            case "Conjured Mana Cake": {
                const newQuality = this.updateConjuredManaCakeQuality({
                    sellIn: newSellIn,
                    quality: item.quality,
                    name: item.name
                });
                return new Item(item.name, newSellIn, newQuality);
            }
            case "Backstage passes to a TAFKAL80ETC concert": {
                const newQuality = this.updateBackStagePassQuality(item.quality, item.sellIn,newSellIn);
                return new Item(item.name, newSellIn, newQuality);
            }
            
            case "Elixir of the Mongoose":
            case "+5 Dexterity Vest":
            default:
            {
                const newQuality = this.updateNormalItemQuality({sellIn:newSellIn, quality:item.quality, name:item.name});
                return new Item(item.name, newSellIn, newQuality );
                }
        }
        

    }

 

    private static updateQuality(item: Readonly<Item>, qualityChange: number) :number {
        let newQuality = item.quality + qualityChange;
        if(item.sellIn < 0)
        {
            newQuality +=qualityChange;
        }
            
        return newQuality;
        //return item.sellIn < 0 ?  item.quality + (qualityChange*2) : item.quality + qualityChange;     
        
    }


    private static updateBackStagePassQuality(currentQuality:number, currentSellIn:number, newSellIn:number) {

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

    public static updateNormalItemQuality(item: Readonly<Item>, qualityChange: number = -1) :number {
        
        if (item.quality <= 0)
            return item.quality;

        return this.updateQuality(item, qualityChange);

    }

    private static updateAgedBrieQuality(item: Readonly<Item>):number {
        //"Aged Brie" actually increases in Quality the older it gets
        if (item.quality >= GildedRose.maxIncreasableQuality)
            return item.quality;

        return this.updateQuality(item, 1);
    }

    public static updateConjuredManaCakeQuality(item: Readonly<Item>):number {
        //"Conjured" items degrade in Quality twice as fast as normal items
        return this.updateNormalItemQuality(item, -2);

    }
}
