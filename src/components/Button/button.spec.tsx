import React from 'react';
import { fireEvent, render } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

describe('Button component', () => {
    let defaultProps: ButtonProps;

    beforeEach(() => {
        defaultProps = {
            disabled: false,
            btnType: ButtonType.Default,
            onClick: jest.fn()
        };
    });

    it('should render correct default button', () => {
        const buttonProps = {
            ...defaultProps
        };

        const wrapper = render(<Button {...buttonProps}>Nice</Button>);
        const element = wrapper.getByText('Nice') as HTMLButtonElement;

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();

        fireEvent.click(element);

        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it('should render correct button based on different props', () => {
        const buttonProps = {
            ...defaultProps,
            btnType: ButtonType.Primary,
            size: ButtonSize.Large,
            className: 'test-class'
        };

        const wrapper = render(<Button {...buttonProps}>Nice</Button>);
        const element = wrapper.getByText('Nice');

        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg test-class');
    });

    it('should render a link when btnType is ButtonType.Link and href attribute is provided', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://dummyurl">Link</Button>);
        const element = wrapper.getByText('Link');

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    });

    it('should render a disabled button when disabled attribute is set to true', () => {
        const buttonProps = {
            ...defaultProps,
            disabled: true
        };

        const wrapper = render(<Button {...buttonProps}>Nice</Button>);
        const element = wrapper.getByText('Nice') as HTMLButtonElement;

        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();

        fireEvent.click(element);

        expect(buttonProps.onClick).not.toHaveBeenCalled();
    });
});
