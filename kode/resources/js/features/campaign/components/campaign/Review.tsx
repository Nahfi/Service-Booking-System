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
        title: 'Set Audience',
        subtitle: 'Write the essential details for your campaign.',
    }
]

const Review: React.FC = () => {
    return (
        <ul className="list-wrapper">
            {ReviewText.map((list, index) => (
                <li
                    className="d-flex justify-content-between align-items-center p-3"
                    key={index}
                >
                    <div>
                        <h6 className="fs-15 mb-1">{list?.title}</h6>
                        <p className="fs-13">{list?.subtitle}</p>
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