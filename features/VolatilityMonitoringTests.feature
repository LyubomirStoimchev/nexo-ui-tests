Feature: Volatility Monitoring

  Scenario Outline: Monitor BTC-USD prices for <collectDuration> minutes
    Given I open Google Finance "BTC-USD" page
    Then verify Terms and Conditions form is present
    When I accept Terms and Conditions
    When I collect prices every 10 seconds for <collectDuration> minutes
    Then verify the average price should not differ by more than 1%
    And verify no price should differ by more than 2%

    Examples:
      | collectDuration |
      |               1 |
      |               3 |
      |               5 |
