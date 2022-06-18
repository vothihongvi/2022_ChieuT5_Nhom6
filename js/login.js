function Validator(options) {
  var selectorRules = {};
  //hàm kiểm tra và show message
  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    var errorMessage;

    //lấy ra các rules của select
    var rules = selectorRules[rule.selector];
    //khi nào có lỗi thì dừng lại kiểm tra
    // console.log(rules);
    for (let i = 0; i < rules.length; ++i) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.style.borderColor = "red";
    } else {
      errorElement.innerText = "";
      inputElement.style.borderColor = "black";
    }

    return !errorMessage;
  }
  // lấy element của form cần validate
  var formLogin = document.querySelector(options.form);

  //xử lý kiểm tra hợp lệ khi blur, clickLogin
  if (formLogin) {
    formLogin.onsubmit = (e) => {
      e.preventDefault();

      var isFormValid = true;

      //lọc qua từng rule và validate
      options.rules.forEach((rule) => {
        var inputElement = formLogin.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          var enableInput = formLogin.querySelectorAll('[name]');
          var formValues = Array.from(enableInput).reduce((values, input) => {
            return (values[input.name] = input.value) && values;
          }, {});
          options.onSubmit(formValues);
        }
      }
    };

    options.rules.forEach((rule) => {
      var inputElement = formLogin.querySelector(rule.selector);

      //lưu lại rules cho mỗi input
      // console.log(selectorRules[rule.selector])
      if (Array.isArray(selectorRules[rule.selector]))
        selectorRules[rule.selector].push(rule.test);
      else selectorRules[rule.selector] = [rule.test];

      if (inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
      }
    });

    // console.log(selectorRules);
  }
}

//định nghĩa rules
//nguyên tắc của rules
Validator.isRequired = function (selector) {
  return {
    selector: selector,

    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập thông tin";
    },
  };
};

Validator.isPhone = function (selector) {
  return {
    selector: selector,
    test: function (phoneNumber) {
      var phoneRegrex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      return phoneRegrex.test(phoneNumber.trim())
        ? undefined
        : "Sdt không hợp lệ";
    },
  };
};

Validator.minLength = function (selector, minLength) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= minLength
        ? undefined
        : `Mật khẩu tối thiểu ${minLength} kí tự`;
    },
  };
};
