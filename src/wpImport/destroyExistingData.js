import { spin, progress } from './utils/progress';

export default async function destroyExistingData(dato) {
  const itemTypes = await spin(
    'Fetching existing data',
    dato.itemTypes.all(),
  );

  const itemTypesToDestroy = itemTypes.filter(it => (
    ['author', 'category', 'tag', 'article', 'page'].includes(it.apiKey)
  ));

  const tick = progress('Destroying existing data', itemTypesToDestroy.length);

  for (const itemType of itemTypesToDestroy) {
    await tick(itemType.id, dato.itemTypes.destroy(itemType.id));
  }
}
