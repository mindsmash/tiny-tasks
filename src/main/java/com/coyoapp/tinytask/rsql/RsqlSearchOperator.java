package com.coyoapp.tinytask.rsql;

import cz.jirutka.rsql.parser.ast.ComparisonOperator;
import cz.jirutka.rsql.parser.ast.RSQLOperators;

public enum RsqlSearchOperator {

  EQUAL(RSQLOperators.EQUAL),
  NOT_EQUAL(RSQLOperators.NOT_EQUAL),
  GREATER_THAN(RSQLOperators.GREATER_THAN),
  GREATER_THAN_OR_EQUAL(RSQLOperators.GREATER_THAN_OR_EQUAL),
  LESS_THAN(RSQLOperators.LESS_THAN),
  LESS_THAN_OR_EQUAL(RSQLOperators.LESS_THAN_OR_EQUAL),
  IN(RSQLOperators.IN),
  NOT_IN(RSQLOperators.NOT_IN);

  private ComparisonOperator comparisonOperator;

  RsqlSearchOperator(final ComparisonOperator comparisonOperator) {
    this.comparisonOperator = comparisonOperator;
  }

  public static RsqlSearchOperator getSimpleComparisonOperator(final ComparisonOperator comparisonOperator) {
    for (final RsqlSearchOperator searchOperator : values()) {
      if (searchOperator.getComparisonOperator() == comparisonOperator) {
        return searchOperator;
      }
    }
    return null;
  }

  public ComparisonOperator getComparisonOperator() {
    return comparisonOperator;
  }

}
