import { Item, GildedRose, createItem } from '@/gilded-rose';



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
    
    for(let i = 0; i < 50; ++i)
    {
      //update conjured once
      GildedRose.updateConjuredManaCakeQualityAndSellIn(conjured);
      //update normal twice
      GildedRose.updateNormalItemQualityAndSellIn(normalItem);
      GildedRose.updateNormalItemQualityAndSellIn(normalItem);
      expect(conjured.quality).toBe(normalItem.quality)
    }
  });
  /* coverage for all known items over 30 days*/
  test.each([10,30,40])
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
      createItem("Conjured Mana Cake", 5,50)]
    
    const gildedRose = new GildedRose(sentItems);
    
    Array.from({ length: days }, x => gildedRose.updateQuality())
    
    const finalItems = gildedRose.updateQuality();
    expect(finalItems).toMatchSnapshot();
  });
})});

