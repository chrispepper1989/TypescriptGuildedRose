import { Item, GildedRose, createItem } from '@/ValidItems/gilded-rose';



/**
 * This unit test uses [Jest Snapshot](https://goo.gl/fbAQLP).
 * 
 * There are two test cases here with different styles:
 * <li>"foo" is more similar to the unit test from the 'Java' version
 * <li>"thirtyDays" is more similar to the TextTest from the 'Java' version
 *
 * I suggest choosing one style to develop and deleting the other.
 */
describe('Gilded Rose Approval (individual tests)', () => {

describe('Items', () => {
 
  test("Conjured Mana Cake degrades twice as fast as normal item", () =>
  {
    const normalItem = createItem("Elixir of the Mongoose", 10,100);
    const conjured = createItem("Conjured Mana Cake", 10,100);
    
    for(let i = 0; i < 100; ++i)
    {
      //update conjured once
      conjured.sellIn -= 1;
      GildedRose.updateConjuredManaCakeQuality(conjured);
      //update normal twice
      normalItem.sellIn -= 1;
      GildedRose.updateNormalItemQuality(normalItem);
      GildedRose.updateNormalItemQuality(normalItem);
     
      expect(conjured.quality).toBe(normalItem.quality)
    }
  });
  /* coverage for all known items over 30 days*/
  test.each([1,5, 10,20, 30])
  ('when given all the known items over %p days, return items based on current rules  ', (days:number) => {

    const sentItems = [
      createItem("+5 Dexterity Vest", 10, 20), //
      createItem("Aged Brie", 2, 0), //
      createItem("Elixir of the Mongoose", 5, 7), //
      createItem("Sulfuras, Hand of Ragnaros", 0, 80), //
      createItem("Sulfuras, Hand of Ragnaros", -1, 80),
      createItem("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      createItem("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      createItem("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      createItem("+5 Dexterity Vest", 20, 100),
      createItem("Conjured Mana Cake", 20,100)]
    
    const gildedRose = new GildedRose(sentItems);
    
    Array.from({ length: days-1 }, x => gildedRose.updateQuality())
    
    const finalItems = gildedRose.updateQuality();
    expect(finalItems).toMatchSnapshot();
  });
})});

