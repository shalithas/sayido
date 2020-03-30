export const getAllQuery = ({page, perPage, sortField, sortOrder}) => {
  return `
        query{
            allGuests(
                page: ${page}
                perPage: ${perPage}
                ${ sortField ? `sortField: "${sortField}"` : '' }
                ${ sortOrder ? `sortOrder: ${sortOrder}` : '' }
            ){
                id
                name
                email
            }
        }
    `;
};
