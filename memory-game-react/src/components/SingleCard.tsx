interface SingleCardProps {
    letter: string
}

function SingleCard(props: SingleCardProps) {
    return (
        <div className={"card col-3 p-2 p-md-5 text-center"}>
            <span>{props.letter}</span>
        </div>
    );
}

export default SingleCard;