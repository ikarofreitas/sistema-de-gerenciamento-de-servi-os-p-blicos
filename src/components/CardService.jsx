import AddServiceButton from "./AddServiceButton"


export default function CardService(){
    return(
        <div class="h-screen flex items-center justify-center bg-gray-100">
            <div class="bg-white p-8 rounded-2xl shadow-lg w-96 grid grid-cols-2">
                <h2 class="text-2xl font-semibold cursor-default">Serviços</h2>
                <AddServiceButton />
             </div>
        </div>
    )
}