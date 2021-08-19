import React from 'react'

export default function Resheba(props) {
    return (
        <>
        <header>
            <div className="search">
                <img className="google active" width="20px" src="static/icons/google.svg" />
                <img className="rebot" width="10px" src="static/icons/resheba.svg" />
                <input className="google active" type="text" autoComplete="off" />
                <input step="1" inputMode="decimal" className="rebot" autoComplete="off" />
            </div>
            <div className="wraper">
                <button id="bel">Бел яз</button>
                <button id="rus">Рус яз</button>
                <button id="alg">Алгебра</button>
                <button id="geom">Геометрия</button>
                <button id="him">Химия</button>
                <button id="phis">Физика</button>
                <button id="brainly">Brainly</button>
                <button id="eng">Английский</button>
                <button id="math">Photomath</button>
            </div>
        </header>

        <div className="tool-bar">
            <button onClick={() => props.setNotebooksOpen(true)}>
                <svg width="32" height="32" viewBox="0 0 28 28" fill="var(--text)"><path d="M9.5791 20.7207C11.1172 20.720 12.1807 21.2744 12.6553 21.5996C12.8223 21.6875 13.2617 21.96 13.376 21.9863V7.37891C12.7168 6.23633 10.915 5.33984 9.07812 5.33984C6.64355 5.33984 4.65723 6.71094 4.13867 7.74805V21.0283C4.14746 21.8105 4.58691 22.127 5.13184 22.127C5.53613 22.127 5.79102 21.9863 6.06348 21.7754C6.62598 21.3184 7.91797 20.7207 9.5791 20.7207ZM18.4209 20.7207C20.082 20.7207 21.3652 21.3184 21.9277 21.7754C22.2002 21.9863 22.4551 22.127 22.8506 22.127C23.3955 22.127 23.8525 21.8105 23.8525 21.0283V7.74805C23.334 6.71094 21.3477 5.33984 18.9219 5.33984C17.085 5.33984 15.2744 6.23633 14.624 7.37891V22.0039C14.7295 21.9775 15.1689 21.6963 15.3447 21.5996C15.8193 21.2744 16.8828 20.7207 18.4209 20.7207Z"></path></svg>
            </button>

            <span id="current-subj">ReBot</span>

            <button onClick={() => props.setSettingsOpen(true)}>
                <svg width="30" height="30" viewBox="0 0 28 28" fill="var(--text)"><path d="M13.2002 23.0059H14.8086C15.3359 23.0059 15.7314 22.6895 15.8457 22.1709L16.2852 20.3164C16.584 20.2109 16.8652 20.0967 17.1289 19.9736L18.7549 20.9756C19.1855 21.248 19.7041 21.2041 20.0645 20.8438L21.1982 19.71C21.5586 19.3496 21.6113 18.8135 21.3213 18.374L20.3281 16.7656C20.4512 16.502 20.5654 16.2207 20.6533 15.9482L22.5254 15.5088C23.0439 15.3945 23.3516 14.999 23.3516 14.4717V12.8896C23.3516 12.3711 23.0439 11.9668 22.5254 11.8525L20.6709 11.4043C20.5742 11.0967 20.4512 10.8242 20.3457 10.5869L21.3389 8.94336C21.6201 8.49512 21.585 7.99414 21.207 7.625L20.0645 6.49121C19.6953 6.15723 19.2295 6.0957 18.7812 6.3418L17.1289 7.36133C16.874 7.23828 16.5928 7.12402 16.2939 7.01855L15.8457 5.1377C15.7314 4.61914 15.3359 4.30273 14.8086 4.30273H13.2002C12.6641 4.30273 12.2686 4.61914 12.1543 5.1377L11.7148 7.00977C11.416 7.10645 11.126 7.2207 10.8623 7.35254L9.21875 6.3418C8.77051 6.0957 8.31348 6.14844 7.93555 6.49121L6.79297 7.625C6.41504 7.99414 6.37988 8.49512 6.66113 8.94336L7.6543 10.5869C7.54883 10.8242 7.43457 11.0967 7.3291 11.4043L5.47461 11.8525C4.95605 11.9668 4.64844 12.3711 4.64844 12.8896V14.4717C4.64844 14.999 4.95605 15.3945 5.47461 15.5088L7.34668 15.9482C7.43457 16.2207 7.54883 16.502 7.67188 16.7656L6.67871 18.374C6.38867 18.8135 6.44141 19.3496 6.81055 19.71L7.93555 20.8438C8.2959 21.2041 8.81445 21.248 9.25391 20.9756L10.8711 19.9736C11.1348 20.0967 11.416 20.2109 11.7148 20.3164L12.1543 22.1709C12.2686 22.6895 12.6641 23.0059 13.2002 23.0059ZM14 16.7305C12.3125 16.7305 10.9326 15.3418 10.9326 13.6455C10.9326 11.9668 12.3125 10.5869 14 10.5869C15.6963 10.5869 17.0762 11.9668 17.0762 13.6455C17.0762 15.3418 15.6963 16.7305 14 16.7305Z"></path></svg>
            </button>
        </div>

        <div id="boxes"></div>


        <div className="template">
            <div id="viewbox" className="viewbox" complete="false">
                <div className="viewbox-tools">
                    <button className="alt" id="alt-re">Решебник 2</button>
                    <div className="center-section">
                        <button id="prew" onClick={() => globalThis.ReBot.change_num(this.parentNode, -1)}><i className="fas fa-chevron-left fa-lg"></i></button>
                        <span className="num"></span>
                        <button id="next" onClick={() => globalThis.ReBot.change_num(this.parentNode, 1)}><i className="fas fa-chevron-right fa-lg"></i></button>
                    </div>
                    <button className="close" onClick={() => globalThis.ReBot.remove(this.parentNode.parentNode)}><i className="fas fa-times fa-lg"></i></button>
                </div>
                <div className="viewbox-content">
                    <img width="100%" id="view"/>
                </div>
            </div>
        </div>
        </>
    )
}
