"""change ProductVariation.key to Enum

Revision ID: a1aef3928b34
Revises: 46622e7befc4
Create Date: 2024-07-25 12:49:09.814680

"""

from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "a1aef3928b34"
down_revision: Union[str, None] = "46622e7befc4"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# Define the enum type
variation_type_enum = sa.Enum("SIZE", "COLOR", name="variationtype")


def upgrade() -> None:
    # Create the new enum type
    variation_type_enum.create(op.get_bind(), checkfirst=True)

    # Update existing data in the 'key' column to 'SIZE'
    op.execute("UPDATE product_variation SET key = 'SIZE' WHERE key IS NOT NULL")

    # Alter the column type using raw SQL to specify the cast
    op.execute(
        "ALTER TABLE product_variation ALTER COLUMN key TYPE variationtype "
        "USING key::variationtype"
    )


def downgrade() -> None:
    # Revert the column type back to VARCHAR(50)
    op.execute("ALTER TABLE product_variation ALTER COLUMN key TYPE VARCHAR(50)")

    # Drop the enum type
    variation_type_enum.drop(op.get_bind(), checkfirst=True)
