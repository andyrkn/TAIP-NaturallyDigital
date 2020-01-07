using CentralRequestsSystem.Business.RequestBusiness.ExpressionVisitors;
using CentralRequestsSystem.Business.RequestBusiness.Models;
using CentralRequestsSystem.Core;
using System;
using System.Linq.Expressions;

namespace CentralRequestsSystem.Business.RequestBusiness.Extensions
{
    public static class FilterModelExtensions
    {
        public static Expression<Func<Request, bool>> And(this Expression<Func<Request, bool>> expr1, Expression<Func<Request, bool>> expr2)
        {
            var param = Expression.Parameter(typeof(Request));

            var leftVisitor = new ReplaceExpressionVisitor(expr1.Parameters[0], param);
            var left = leftVisitor.Visit(expr1.Body);

            var rightVisitor = new ReplaceExpressionVisitor(expr2.Parameters[0], param);
            var right = rightVisitor.Visit(expr2.Body);

            return Expression.Lambda<Func<Request, bool>>(Expression.AndAlso(left, right), param);
        }

        public static Expression<Func<Request, bool>> ToExpression(this FilterModel filterModel)
        {
            Expression<Func<Request, bool>> expression = request => true;

            if(filterModel.UserAdress != null)
            {
                Expression<Func<Request, bool>> userAdressExpression = request => request.UserAdress == filterModel.UserAdress;
                expression = expression.And(userAdressExpression);
            }

            if (filterModel.IdentityProviderAdress != null)
            {
                Expression<Func<Request, bool>> identityProviderExpression = request => request.IdentityProviderAdress == filterModel.IdentityProviderAdress;
                expression = expression.And(identityProviderExpression);
            }

            if(filterModel.Granted != null)
            {
                Expression<Func<Request, bool>> grantedExpression = request => request.Granted == filterModel.Granted;
                expression = expression.And(grantedExpression);
            }

            return expression;
        }
    }
}
