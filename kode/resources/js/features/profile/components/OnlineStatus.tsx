import type React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../../components/common/card/Card';
import CardBody from '../../../components/common/card/CardBody';
import CardHeader from '../../../components/common/card/CardHeader';
import { valueToKey } from '../../../utils/helper';

const OnlineStatus: React.FC = ({ onStatusUpdate, user, isPending }) => {
    const {t} = useTranslation()
  return ( 
        <Card>
            <CardHeader
                cardTitle="Visibility Settings"
                description="Control how others see your online presence"
            />
            <CardBody>
                <div className="d-flex align-items-center justify-content-between gap-4 flex-wrap p-3 bg--light rounded-3">
                    <div>
                        <h6 className="fs-14 mb-1">
                            {t(
                                valueToKey(`Show Online Status`),
                                `Show Online Status`
                            )}
                        </h6>
                        <p className="fs-13 text-muted">
                            {t(
                                valueToKey(
                                    `Let others know when you're available`
                                ),
                                `Let others know when you're available`
                            )}
                        </p>
                    </div>

                    <span className="form-check form-switch me-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            disabled={isPending}
                            checked={
                                user?.status === "active"
                                    ? false
                                    : true
                            }
                          onChange={onStatusUpdate}
                        />
                    </span>
                </div>
            </CardBody>
        </Card>
    );
}

export default OnlineStatus