function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let newExpr = "";
    let innerExpr = "";
    let rightExprPart = "";
    let leftExprPart = "";

    let i;
    let k;
    let bracketsOpen = 0;
    let bracketsClose = 0;

    if (expr.indexOf(")") !== -1 || expr.indexOf("(") !== -1) {
        for (let z = 0; z < expr.length; z++) {
            if (expr[z] === "(") {
                bracketsOpen++;
            } else if (expr[z] === ")") {
                bracketsClose++;
            }
        }
    }

    if (bracketsOpen === bracketsClose) {

        while (expr.length > 0) {
            if (expr[0] === " ") {
                expr = expr.substr(1);
            } else {
                newExpr = newExpr + expr[0];
                expr = expr.substr(1);
            }
        }



        while (newExpr.indexOf(")") !== -1 && newExpr.indexOf("(") !== -1) {
            innerExpr = "";
            i = newExpr.indexOf(")") - 1;
            rightExprPart = newExpr.substr(i + 2);
            while (newExpr[i] !== "(") {
                innerExpr = newExpr[i] + innerExpr;
                i--;
            }
            leftExprPart = newExpr.slice(0, i);


            newExpr = leftExprPart + simpleExpressionResult(innerExpr) + rightExprPart;
            newExpr = newExpr.replace("--", "+");
            newExpr = newExpr.replace("+-", "-");
        }

        return simpleExpressionResult(newExpr);
    }

    throw new Error("ExpressionError: Brackets must be paired");
}


function simpleExpressionResult(newExpr) {

    let leftExpr = "";
    let rightExpt = "";
    let midNumber;

    let n;
    let m;

    let left = "";
    let right = "";

    while (!Number(newExpr) && Number(newExpr) !== 0) {


        while (newExpr.indexOf("/") > 0 || newExpr.indexOf("*") > 0) {
            for (let i = 0; i < newExpr.length; i++) {
                if (newExpr[i] === "/") {
                    n = i;
                    m = i;

                    left = "";

                    while (newExpr[n - 1] < 10 || newExpr[n - 1] === ".") {
                        left = newExpr[n - 1] + left;
                        n--;
                    }

                    if (newExpr[i + 1] === "-") {
                        right = "-";
                        m++;
                    } else {
                        right = "";
                    }

                    while (newExpr[m + 1] < 10 || newExpr[m + 1] === ".") {
                        right = right + newExpr[m + 1];
                        m++;
                    }

                    if (Number(right) === 0) {
                        throw new Error("TypeError: Division by zero.");
                    }

                    midNumber = (Number(left) / Number(right));
                    leftExpr = newExpr.slice(0, n);
                    rightExpt = newExpr.substr(m + 1);
                    newExpr = leftExpr + midNumber.toFixed(15) + rightExpt;


                } else if (newExpr[i] === "*") {
                    n = i;
                    m = i;

                    left = "";

                    while (newExpr[n - 1] < 10 || newExpr[n - 1] === ".") {
                        left = newExpr[n - 1] + left;
                        n--;
                    }

                    if (newExpr[i + 1] === "-") {
                        right = "-";
                        m++;
                    } else {
                        right = "";
                    }

                    while (newExpr[m + 1] < 10 || newExpr[m + 1] === ".") {
                        right = right + newExpr[m + 1];
                        m++;
                    }

                    midNumber = (Number(left) * Number(right));
                    leftExpr = newExpr.slice(0, n);
                    rightExpt = newExpr.substr(m + 1);
                    newExpr = leftExpr + midNumber.toFixed(15) + rightExpt;
                    break;
                }
            }
        }

        newExpr = newExpr.replace("--", "+");
        newExpr = newExpr.replace("+-", "-");

        while (!Number(newExpr) && Number(newExpr) !== 0) {
            let k;
            left = newExpr[0];
            for (k = 1; newExpr[k] < 10 || newExpr[k] === ".";) {
                left += newExpr[k];
                k++;
            }

            m = k;

            if (newExpr[k] === "+") {
                right = "";

                while (newExpr[m + 1] < 10 || newExpr[m + 1] === ".") {
                    right = right + newExpr[m + 1];
                    m++;
                }

                midNumber = (Number(left) + Number(right));
                rightExpt = newExpr.substr(m + 1);
                newExpr = midNumber.toFixed(15) + rightExpt;

            } else if (newExpr[k] === "-") {

                right = "";

                while (newExpr[m + 1] < 10 || newExpr[m + 1] === ".") {
                    right = right + newExpr[m + 1];
                    m++;
                }

                midNumber = (Number(left) - Number(right));
                rightExpt = newExpr.substr(m + 1);
                newExpr = midNumber.toFixed(15) + rightExpt;
            }

        }
    }

    return Number(newExpr);

}


module.exports = {
    expressionCalculator
}