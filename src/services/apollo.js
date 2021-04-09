import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://countries-274616.ew.r.appspot.com",
    cache: new InMemoryCache(),
});

export const GET_COUNTRIES = gql`
    query getCountries {
        Country {
            _id
            name
            capital
            area
            population
            alpha2Code
            flag {
                svgFile
            }
            topLevelDomains {
                name
            }
        }
    }
`;

export const GET_COUNTRY_MAP = gql`
    query getCountryMap($id: String!) {
        Country(_id: $id) {
            alpha2Code
            distanceToOtherCountries(first: 5) {
                distanceInKm
                countryName
            }
        }
    }
`;
