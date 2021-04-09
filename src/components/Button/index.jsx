import "./styles.css";

export const Button = ({ color, type, children, ...props }) => (
    <button
        {...props}
        className="button"
        color={color ? color : "primary"}
        type={type ? type : "button"}
        data-testid="button-component"
    >
        {children}
    </button>
);
