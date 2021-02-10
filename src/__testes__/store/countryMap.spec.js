import reducer, { countryMapSuccess, hasError, startLoading } from '../../store/countryMap'

describe('CountryMap Reducer', () => {
    test('should check the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            countryMap: null,
            isLoading: true,
            error: false,
        });
    });

    test('should check if the countryMap have been added', () => {
        expect(reducer(undefined, {
            type: countryMapSuccess.type,
            payload: [
                {
                    country: 'Brazil',
                    value: '1234567',
                },
                {
                    country: 'Poland',
                    value: '8464654',
                },
            ]
        })).toEqual({
            error: false,
            isLoading: false,
            countryMap: [
                {
                    country: 'Brazil',
                    value: '1234567',
                },
                {
                    country: 'Poland',
                    value: '8464654',
                },
            ]
        });
    });

    test('should check if an error has been defined', () => {
        expect(reducer(undefined, {
            type: hasError.type,
            payload: 'Error!'
        })).toEqual({
            countryMap: null,
            isLoading: false,
            error: 'Error!'
        });
    });

    test('should check if isLoading is true', () => {
        expect(reducer(undefined, {
            type: startLoading.type
        })).toEqual({
            isLoading: true,
            countryMap: null,
            error: false
        });
    });
});

describe('CountryMap Actions', () => {
    describe('Actions Types', () => {
        test('should return the action type equal countryMap/countryMapSuccess', () => {
            expect(countryMapSuccess.type).toEqual('countryMap/countryMapSuccess');
        });
        test('should return the action type equal countryMap/hasError', () => {
            expect(hasError.type).toEqual('countryMap/hasError');
        });
        test('should return the action type equal countryMap/startLoading', () => {
            expect(startLoading.type).toEqual('countryMap/startLoading');
        });
    });

    describe('Actions Creators', () => {
        test('should return the action creator equal countryMapSuccess { type: countryMap/countryMapSuccess }', () => {
            expect(countryMapSuccess()).toEqual({ type: 'countryMap/countryMapSuccess' })
        });
        test('should return the action creator equal hasError { type: countryMap/hasError }', () => {
            expect(hasError()).toEqual({ type: 'countryMap/hasError' })
        });
        test('should return the action creator equal startLoading { type: countryMap/startLoading }', () => {
            expect(startLoading()).toEqual({ type: 'countryMap/startLoading' })
        });
    });
});