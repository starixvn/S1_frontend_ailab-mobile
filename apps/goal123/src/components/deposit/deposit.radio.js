import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const Radio = ({
                 radioGroup,
                 id,
                 imgUrl,
                 imgAlt,
                 onChange,
                 isSelect,
                 className,
                 displayName,
                 minAmount,
                 maxAmount,
                 i18n,
                 _isConvert,
                 bankClassName,
                 canSubmit
               }) => {
  return (
    <div className={isSelect ? className : ""}>
      <input
        type="radio"
        name={radioGroup}
        id={id}
        value=""
        onChange={onChange}
        checked={isSelect}
      />
      <label htmlFor={id}>
        <div />
      </label>
      <div className={`bankName ${canSubmit ? "" : "pending"}`}>
        <img src={imgUrl} alt={imgAlt} />
        {canSubmit ? "" : <div className="mask" />}
      </div>
      <BankInfo
        displayName={displayName}
        i18n={i18n}
        minAmount={minAmount}
        maxAmount={maxAmount}
        _isConvert={_isConvert}
        bankClassName={bankClassName}
        isSelect={isSelect}
      />
    </div>
  );
};

Radio.defaultProps = {
  className: "",
  minAmount: null,
  maxAmount: null,
  displayName: "",
  _isConvert: false,
  bankClassName: "",
  canSubmit: true
};

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelect: PropTypes.bool.isRequired,
  radioGroup: PropTypes.string.isRequired,
  className: PropTypes.string,
  displayName: PropTypes.string,
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  _isConvert: PropTypes.bool,
  bankClassName: PropTypes.string,
  canSubmit: PropTypes.bool,
};

const BankInfo = ({
                    displayName,
                    bankClassName,
                    i18n,
                    minAmount,
                    maxAmount,
                    _isConvert,
                    isSelect
                  }) => {
  const _class = bankClassName && isSelect ? bankClassName : "bank";
  return displayName ? (
    <div className={_class}>
      <div>{displayName}</div>
      {minAmount === null || maxAmount === null ? null : (
        <div>
          <div>
            {`${i18n?.lbl_Min}: ${
              minAmount === 0
                ? i18n.lbl_Unlimited
                : number_format(minAmount, _isConvert, 0)
            }`}
          </div>
          <div>
            {`${i18n?.lbl_Max}: ${
              maxAmount === 0
                ? i18n.lbl_Unlimited
                : number_format(maxAmount, _isConvert, 0)
            }`}
          </div>
        </div>
      )}
    </div>
  ) : null;
};

BankInfo.defaultProps = {
  minAmount: null,
  maxAmount: null,
  displayName: "",
  bankClassName: "",
  isSelect: false
};

BankInfo.propTypes = {
  displayName: PropTypes.string,
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  _isConvert: PropTypes.bool.isRequired,
  bankClassName: PropTypes.string,
  isSelect: PropTypes.bool
};

export default Radio;
