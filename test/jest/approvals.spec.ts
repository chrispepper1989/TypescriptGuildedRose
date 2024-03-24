import { Item, GildedRose } from '@/gilded-rose';

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
 
  /* coverage for all known items over 30 days*/
  test.each([10,30,40])
  ('when given all the known items over %p days, return items based on current rules  ', (days:number) => {

    const sentItems = [
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]
    
    const gildedRose = new GildedRose(sentItems);
    
    Array.from({ length: days }, x => gildedRose.updateQuality())
    
    const finalItems = gildedRose.updateQuality();
    expect(finalItems).toMatchSnapshot();
  });
})});

