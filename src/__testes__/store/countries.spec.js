import reducer, { countriesSuccess, updateCountry, hasError, startLoading } from '../../store/countries'

describe('Countries Reducer', () => {
    test('should check the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            countries: null,
            isLoading: false,
            error: false,
            search: '',
            pagination: {
                countries: null,
                last: 0,
                active: 0,
                offset: 8,
            }
        });
    });

    test('should check if the countries have been added', () => {
        expect(reducer(undefined, {
            type: countriesSuccess.type,
            payload: [
                {
                    name: 'Brazil',
                },
                {
                    name: 'Poland',
                },
            ]
        })).toEqual({
            error: false,
            isLoading: false,
            countries: [
                {
                    name: 'Brazil',
                },
                {
                    name: 'Poland',
                },
            ],
            search: '',
            pagination: {
                countries: null,
                last: 0,
                active: 0,
                offset: 8,
            }
        });
    });

    test('should update country', () => {
        expect(reducer({
            countries: [
                {
                    _id: 1,
                    name: 'Brazil',
                },
                {
                    _id: 2,
                    name: 'Poland',
                },
            ],
            error: false,
            isLoading: false,
        }, {
            type: updateCountry.type,
            payload: {
                _id: 1,
                name: 'Brasil',
                capital: 'Brazilia',
            }
        })).toEqual({
            error: false,
            isLoading: false,
            countries: [
                {
                    _id: 1,
                    name: 'Brasil',
                    capital: 'Brazilia',
                },
                {
                    _id: 2,
                    name: 'Poland',
                },
            ]
        });
    });

    test('should check if an error has been defined', () => {
        expect(reducer(undefined, {
            type: hasError.type,
            payload: 'Error!'
        })).toEqual({
            countries: null,
            isLoading: false,
            error: 'Error!',
            search: '',
            pagination: {
                countries: null,
                last: 0,
                active: 0,
                offset: 8,
            }
        });
    });

    test('should check if isLoading is true', () => {
        expect(reducer(undefined, {
            type: startLoading.type
        })).toEqual({
            countries: null,
            error: false,
            isLoading: true,
            search: '',
            pagination: {
                countries: null,
                last: 0,
                active: 0,
                offset: 8,
            }
        });
    });
});

describe('Countries Actions', () => {
    describe('Actions Types', () => {
        test('should return the action type equal countries/countriesSuccess', () => {
            expect(countriesSuccess.type).toEqual('countries/countriesSuccess');
        });
        test('should return the action type equal countries/updateCountry', () => {
            expect(updateCountry.type).toEqual('countries/updateCountry');
        });
        test('should return the action type equal countries/hasError', () => {
            expect(hasError.type).toEqual('countries/hasError');
        });
        test('should return the action type equal countries/startLoading', () => {
            expect(startLoading.type).toEqual('countries/startLoading');
        });
    });

    describe('Actions Creators', () => {
        test('should return the action creator equal countriesSuccess { type: countries/countriesSuccess }', () => {
            expect(countriesSuccess()).toEqual({ type: 'countries/countriesSuccess' })
        });
        test('should return the action creator equal updateCountry { type: countries/updateCountry }', () => {
            expect(updateCountry()).toEqual({ type: 'countries/updateCountry' })
        });
        test('should return the action creator equal hasError { type: countries/hasError }', () => {
            expect(hasError()).toEqual({ type: 'countries/hasError' })
        });
        test('should return the action creator equal startLoading { type: countries/startLoading }', () => {
            expect(startLoading()).toEqual({ type: 'countries/startLoading' })
        });
    });
});