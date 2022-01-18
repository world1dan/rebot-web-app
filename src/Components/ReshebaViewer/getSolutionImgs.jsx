import React from "react"


export default function getSolutionImgs (subjectInfo, num) {

    const imgs = []
    
    if (subjectInfo.section) {

        const baseUrl = subjectInfo.url.replace("*", num - (subjectInfo.title == "Химия" ? 1 : 0))

        for (let i=1; i < 10; i++) {

            const url = baseUrl.replace("?", i)
            
            imgs.push(
                <img 
                    key={url} 
                    src={url} 
                    width="100%" 
                    onError={(e) => e.target.style.display="none"}
                />
            )
        }
    } else {

        const baseUrl = subjectInfo.url.replace("?", num)
        
        imgs.push(
            <img 
                key={baseUrl} 
                src={baseUrl} 
                width="100%" 
                onError={(e) => e.target.style.display="none"}
            />,
        )

        if (!subjectInfo.full_img) {
            for (let i=1; i < 4; i++) {
                const url = subjectInfo.url.replace("?", num + "_" + i)

                imgs.push(
                    <img key={url} src={url} width="100%" onError={(e) => e.target.style.display="none"}/>,
                )
            }
        }
    }

    return imgs
}