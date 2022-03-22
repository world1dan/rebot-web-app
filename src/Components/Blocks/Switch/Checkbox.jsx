export const CheckBox = ({ checked, onChange }) => {
    return (
        <label className="ios7-switch">
            <input type="checkbox" checked={ checked } onChange={onChange}/>
            <span></span>
        </label>
    )
}
