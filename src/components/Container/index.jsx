import "./styles.css";

export const Container = ({ children, ...props }) => (
    <div className="container" data-testid="container-component" {...props}>
        {children}
    </div>
);
