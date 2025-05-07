import React from "react";

const ReviewText = [
    {
        title: 'Campaign Setup',
        subtitle: 'Write the essential details for your campaign.',
    },
    {
        title: 'Compose Message',
        subtitle: 'Write the essential details for your campaign.',
    },
    {
        title: 'Campaign Setup',
        subtitle: 'Write the essential details for your campaign.',
    }
]
const Review = () => {
    return (
        <ul className="list-wrapper">
            {ReviewText.map((list, index) => (
                <li className="d-flex justify-content-between align-items-center" key={index}>
                    <div>
                        <h6 className="fs-17 mb-2">{list.title}</h6>
                        <p>{list.subtitle}</p>
                    </div>
                    <button type="button" className="i-btn btn--dark outline btn--lg">Edit Subject</button>
                </li>
            ))}
        </ul>
    )
}

export default Review;