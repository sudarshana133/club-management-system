import { Coordinator } from "../../utils/types"

interface ShowCoordinatorsProps {
    coordinators: Coordinator[]
}

const ShowCoordinators: React.FC<ShowCoordinatorsProps> = ({coordinators}) => {
    // console.log(coordinators)
  return (
    <div >
        {
            coordinators.map((coordinator: Coordinator)=>(
                <div key={coordinator.uid}>
                    <h1>{coordinator.email}</h1>
                </div>
            ) )
        }
    </div>
  )
}

export default ShowCoordinators