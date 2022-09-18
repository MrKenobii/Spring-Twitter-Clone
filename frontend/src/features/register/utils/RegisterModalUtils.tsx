import {RegisterFormOne} from "../components/RegisterFormOne/RegisterFormOne";

export const determineModalContent = (step: number): JSX.Element => {
    switch (step) {
        case 1:
            return <RegisterFormOne />
        case 2:
            return <span>Registiration Step 2</span>
        case 3:
            return <span>Registiration Step 3</span>
        case 4:
            return <span>Registiration Step 4</span>
        case 5:
            return <span>Registiration Step 5</span>
        case 6:
            return <span>Registiration Step 6</span>
        default:
            return <></>

    }
}