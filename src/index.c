#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <math.h>
#include <ctype.h>
#include <stdlib.h>
#include <time.h>

const char test[7] = "tester\0";

int main()
{
    printf(test);
    return 0;
}
