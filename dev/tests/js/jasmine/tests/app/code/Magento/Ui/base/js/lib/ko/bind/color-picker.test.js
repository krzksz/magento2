/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'jquery',
    'rjsResolver',
    'Magento_Ui/js/lib/knockout/bindings/color-picker'
], function (ko, $, resolver) {
    'use strict';

    var $input;

    beforeAll(function () {
        define('spectrum', function () {
            return jasmine.createSpy();
        });
    });

    afterAll(function () {
        require.undef('spectrum');
    });

    describe('Colorpicker binding', function () {
        it('Should call spectrum on $input with disabled configuration if view model disabled', function (done) {
            var value = {
                    configStuffInHere: true
                },
                valueAccessor = jasmine.createSpy().and.returnValue(value),
                viewModel = {
                    disabled: jasmine.createSpy().and.returnValue(true)
                };

            $.fn.spectrum = jasmine.createSpy();
            $input = jasmine.createSpy();

            ko.bindingHandlers.colorPicker.init($input, valueAccessor, null, viewModel);

            resolver(function () { //eslint-disable-line max-nested-callbacks
                expect(value.change).toEqual(jasmine.any(Function));
                expect(value.hide).toEqual(jasmine.any(Function));
                expect(value.show).toEqual(jasmine.any(Function));
                expect(value.change).toBe(value.hide);

                expect($.fn.spectrum.calls.allArgs()).toEqual([[value], ['disable']]);
                expect(viewModel.disabled).toHaveBeenCalled();

                done();
            });
        });

        it('Should call spectrum on $input with extra configuration if view model enabled', function (done) {
            var value = {
                    configStuffInHere: true
                },
                valueAccessor = jasmine.createSpy().and.returnValue(value),
                viewModel = {
                    disabled: jasmine.createSpy().and.returnValue(false)
                };

            $.fn.spectrum = jasmine.createSpy();
            $input = jasmine.createSpy();

            ko.bindingHandlers.colorPicker.init($input, valueAccessor, null, viewModel);

            resolver(function () { //eslint-disable-line max-nested-callbacks
                expect(value.change).toEqual(jasmine.any(Function));
                expect(value.hide).toEqual(jasmine.any(Function));
                expect(value.show).toEqual(jasmine.any(Function));
                expect(value.change).toBe(value.hide);

                expect($.fn.spectrum.calls.allArgs()).toEqual([[value], ['enable']]);
                expect(viewModel.disabled).toHaveBeenCalled();

                done();
            });
        });

        it('Verify config value is empty when reset colorpicker intput', function (done) {
            var value = {
                    configStuffInHere: true,
                    value: jasmine.createSpy().and.returnValue(undefined)
                },
                valueAccessor = jasmine.createSpy().and.returnValue(value),
                viewModel = {
                    disabled: jasmine.createSpy().and.returnValue(false)
                };

            $.fn.spectrum = jasmine.createSpy();
            $input = jasmine.createSpy();

            ko.bindingHandlers.colorPicker.update($input, valueAccessor, null, viewModel);

            resolver(function () { //eslint-disable-line max-nested-callbacks
                expect($.fn.spectrum).toHaveBeenCalledTimes(1);
                expect(valueAccessor().value).toHaveBeenCalledTimes(4);

                value.value = jasmine.createSpy().and.returnValue('');
                ko.bindingHandlers.colorPicker.update($input, valueAccessor, null, viewModel);

                resolver(function () { //eslint-disable-line max-nested-callbacks
                    expect($.fn.spectrum).toHaveBeenCalledTimes(3);
                    expect(valueAccessor().value).toHaveBeenCalledTimes(5);

                    done();
                });
            });
        });
    });
});
