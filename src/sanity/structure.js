// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Blog')
    .items([
      // S.documentTypeListItem('post').title('Posts'),
      // S.documentTypeListItem('category').title('Categories'),
      // S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('property').title('Properties'),
      S.documentTypeListItem('auxiliar').title('Auxiliars'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        // (item) => item.getId() && !['post', 'category', 'author'].includes(item.getId()),
        (item) =>
          item.getId() && !['property', 'auxiliar'].includes(item.getId()),
      ),
    ]);
