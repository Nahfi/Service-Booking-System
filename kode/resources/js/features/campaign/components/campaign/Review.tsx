import React from "react";
import Button from "../../../../components/common/button/Button";

interface ReviewTextItem {
    title: string;
    subtitle: string;
}

const ReviewText: ReviewTextItem[] = [
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

const Review: React.FC = () => {
    return (
        <ul className="list-wrapper">
            {ReviewText.map((list, index) => (
                <li
                    className="d-flex justify-content-between align-items-center"
                    key={index}
                >
                    <div>
                        <h6 className="fs-17 mb-2">{list?.title}</h6>
                        <p>{list?.subtitle}</p>
                    </div>

                    <Button
                        type="button"
                        className="btn--dark outline btn--lg"
                    >
                        Edit Subject
                    </Button>
                </li>
            ))}
        </ul>
    );
};

export default Review;