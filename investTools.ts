/**
 * Created by easyman-imac on 2017/5/25.
 */

/**
 * 首月投资后，每月复投
 */
class FirstMonthRInvestment {
    //β 月利率
    β: number = 0;
    //b 首月投资本金
    b: number = 0;
    //n 投资月数
    n: number = 0;

    //中间量
    //a=1+β
    a: number = 1 + this.β;
    //x =（ a+a^2+a^3+a^4+...+a^n）中间量
    //  = ([a^(n+1)-a]/(a-1) - n )/n
    x = (Math.pow(this.a, (this.n + 1)) - this.a) / (this.a - 1);

    /**
     * @param monthInterestRate     月利率
     * @param firstMonthPrincipal   首月本金
     * @param monthNum              投资月数
     */
    constructor(monthInterestRate: number,
                firstMonthPrincipal: number,
                monthNum: number) {
        this.β = monthInterestRate;
        this.b = firstMonthPrincipal;
        this.n = monthNum;

        this.a = 1 + this.β;
        this.x = (Math.pow(this.a, (this.n + 1)) - this.a) / (this.a - 1);
    }

    /**
     * 重设数据
     * @param monthInterestRate     月利率
     * @param firstMonthPrincipal   首月本金
     * @param monthNum              投资月数
     */
    resetData(monthInterestRate: number,
              firstMonthPrincipal: number,
              monthNum: number) {
        this.β = monthInterestRate;
        this.b = firstMonthPrincipal;
        this.n = monthNum;

        this.a = 1 + this.β;
        this.x = (Math.pow(this.a, (this.n + 1)) - this.a) / (this.a - 1);
    }

    /**
     * 总收益
     * @return {number}
     */
    getSI(): number {
        return this.b * (Math.pow(this.a, this.n) - 1);
    }
}

class MonthlyFixedAddInvestment {
    //β是月利率
    β: number;
    //b是本金（每月存款本金）
    b: number;
    //n投资月数
    n: number;

    //中间量
    //a=1+β
    a: number;
    //x =（ a+a^2+a^3+a^4+...+a^n）中间量
    //  = ([a^(n+1)-a]/(a-1) - n )/n
    x: number;

    /**
     * @param monthInterestRate 月利率
     * @param monthPrincipal    月复投本金
     * @param monthNum          投资月数
     */
    constructor(monthInterestRate: number,
                monthPrincipal: number,
                monthNum: number) {
        this.β = monthInterestRate;
        this.b = monthPrincipal;
        this.n = monthNum;

        this.a = 1 + this.β;
        this.x = (Math.pow(this.a, (this.n + 1)) - this.a) / (this.a - 1);
    }

    /**
     * 重新设置数据
     * @param monthInterestRate 月利率
     * @param monthPrincipal    月复投本金
     * @param monthNum          投资月数
     */
    resetData(monthInterestRate: number,
              monthPrincipal: number,
              monthNum: number) {
        this.β = monthInterestRate;
        this.b = monthPrincipal;
        this.n = monthNum;

        this.a = 1 + this.β;
        this.x = (Math.pow(this.a, (this.n + 1)) - this.a) / (this.a - 1);

        return this;
    }

    /**
     * 总本金：SB=b*n
     * @return {number}
     */
    getSB(): number {
        return this.b * this.n;
    }

    /**
     * 总利率：
     * SP = b*( [a^(n+1)-a] / (a-1) - n ) /(b*n)
     *   = ( [a^(n+1)-a] / (a-1) - n )/n
     *   = (x-n)/n
     * @return {number}
     */
    getSP(): number {
        return (this.x - this.n) / this.n;
    }

    /**
     * 总利息：SI= SP*SB
     * @return {number}
     */
    getSI(): number {
        return this.getSP() * this.getSB();
    }

    /**
     *复利率转成年利率（本金一直不变的情况下）FTY: 当n=12时的SP
     * @return {number}
     */
    getFTY(): number {
        return ((Math.pow(this.a, 13) - this.a) / (this.a - 1) - 12) / 12;
    }
}


class LoanInvestment {
    // 贷款本金：sumLoan
    sumLoan: number;
    // 还款总额：sumRepay = RSIR*sumLoan
    sumRepay: number;
    //n还款月数
    monthNum: number = 0;

    //β月利率 RSIR/n
    getMIRate() {
        return this.getRSIR() / this.monthNum;
    }

    //b每月还款金额：b = sumRepay/n
    getMonthRepay(): number {
        return this.sumRepay / this.monthNum;
    };


    // 还款总利率：RSIR = (sumRepay-sumLoan)/sumLoan
    getRSIR(): number {
        return (this.sumRepay - this.sumLoan) / this.sumLoan;
    }

    // 还款总利息：RSI= sumRepay-sumLoan
    getRSI(): number {
        return this.sumRepay - this.sumLoan;
    }

    /**
     * @param sumLoan       总贷款额
     * @param sumRepayment  总还款额
     * @param monthNum      还款月数
     */
    constructor(sumLoan: number,
                sumRepayment: number,
                monthNum: number) {
        this.sumLoan = sumLoan;
        this.sumRepay = sumRepayment;
        this.monthNum = monthNum;
    }

    /**
     * 重新设置数据
     * @param sumLoan       总贷款额
     * @param sumRepayment  总还款额
     * @param monthNum      还款月数
     */
    resetData(sumLoan: number,
              sumRepayment: number,
              monthNum: number) {
        this.sumLoan = sumLoan;
        this.sumRepay = sumRepayment;
        this.monthNum = monthNum;
    }
}

export class InvestTools {
    myLoanInvestment: LoanInvestment;
    myMonthlyFixedAddInvestment;MonthlyFixedAddInvestment;
    myFirstMonthRInvestment: FirstMonthRInvestment;

    constructor(sumLoan: number,
                sumRepayment: number,
                monthNum: number,
                //投资利率
                monthInterestRate: number) {
        this.myLoanInvestment = new LoanInvestment(
            sumLoan,
            sumRepayment,
            monthNum);

        this.myFirstMonthRInvestment = new FirstMonthRInvestment(
            monthInterestRate / 100,
            sumLoan,
            monthNum);

        this.myMonthlyFixedAddInvestment = new MonthlyFixedAddInvestment(
            monthInterestRate / 100,
            this.myLoanInvestment.getMonthRepay(),
            monthNum);

    }

    resetData(sumLoan: number,
              sumRepayment: number,
              monthNum: number,
              //投资利率
              monthInterestRate: number) {

        this.myLoanInvestment.resetData(
            sumLoan,
            sumRepayment,
            monthNum);

        this.myFirstMonthRInvestment.resetData(
            monthInterestRate / 100,
            sumLoan,
            monthNum);

        this.myMonthlyFixedAddInvestment.resetData(
            monthInterestRate / 100,
            this.myLoanInvestment.getMonthRepay(),
            monthNum);
    }

    /**
     * 贷款后的投资总收益
     * @return {number}
     */
    getInvestmentIncome(): number {
        return this.myFirstMonthRInvestment.getSI() - this.myLoanInvestment.getRSI();
    }

    /**
     * 贷款投资总收益-不贷款（每月固定复投）：
     * DZ = FTY/12*n*sumLoan - RSI - SI
     *    = FTY/12*n*sumLoan - RSI - SP * sumRepay
     * @return {number}
     */
    getDZ(): number {
        return this.getInvestmentIncome() - this.myMonthlyFixedAddInvestment.getSI();
    }
//
//     getYear
// {
//     // key: '贷款月利息(%)',
//     value: (this.myInvestTools.myLoanInvestment.getMIRate()*100).toFixed(2)+ '(月%)-'
// + ((this.myInvestTools.myLoanInvestment.getMIRate()*100)*12).toFixed(2)+"(年%)"
// },
// {
//     // key: '投资利息(%)',
//         value: this.investData.monthInterestRate + '(月%)-'
// + this.investData.monthInterestRate*12+"(年%)"
// },
//
//     getddd{
//
// }
}