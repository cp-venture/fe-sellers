export default `
query shop($id: ID!) {
  Shop {
    _id
    currency {
      code
    }
    description
    name
  }
}

fragment NavigationTreeFragment on NavigationTree {
  _id
  shopId
  name
  items {
    navigationItem {
      data {
        ...NavigationItemFields
      }
    }
    items {
      navigationItem {
        data {
          ...NavigationItemFields
        }
      }
      items {
        navigationItem {
          data {
            ...NavigationItemFields
          }
        }
      }
    }
  }
}
fragment NavigationItemFields on NavigationItemData {
  contentForLanguage
  classNames
  url
  isUrlRelative
  shouldOpenInNewWindow
}
`;
